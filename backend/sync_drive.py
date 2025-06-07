# backend/sync_drive.py (VERSÃO COMPLETA E FINAL)

import os
import io
import sqlite3
import ffmpeg
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from datetime import date
from video_processor import process_gym_video

# --- CONFIGURAÇÕES ---
DRIVE_FOLDER_ID = '1k_LgrjyXrNiZVGUzsOIrmYwIiTb2NT-E'
SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
CREDENTIALS_FILE = 'google_credentials.json'

def get_drive_service():
    creds = service_account.Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=SCOPES)
    service = build('drive', 'v3', credentials=creds)
    return service

def sync_and_analyze():
    print("--- INICIANDO SINCRONIZAÇÃO COMPLETA ---")
    service = get_drive_service()
    
    conn = sqlite3.connect('candidatos.db')
    cursor = conn.cursor()
    cursor.execute("SELECT nome FROM candidatos")
    nomes_no_db = {row[0] for row in cursor.fetchall()}
    print(f"Candidatos já no banco: {nomes_no_db if nomes_no_db else 'Nenhum'}")

    query = f"'{DRIVE_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder'"
    results = service.files().list(q=query, fields="files(id, name)").execute()
    candidate_folders = results.get('files', [])

    if not candidate_folders:
        print("Nenhuma pasta de candidato encontrada no Google Drive. Finalizando.")
        conn.close()
        return

    print(f"Encontradas {len(candidate_folders)} pastas de candidatos. Iniciando processamento...")

    # *** O CORAÇÃO DO SCRIPT - O LOOP DE PROCESSAMENTO ***
    for folder in candidate_folders:
        nome_candidato = folder['name']
        if nome_candidato in nomes_no_db:
            print(f"\n- Candidato '{nome_candidato}' já processado. Pulando.")
            continue

        print(f"\n--- Processando NOVO candidato: {nome_candidato} ---")

        video_query = f"'{folder['id']}' in parents and mimeType contains 'video/'"
        video_results = service.files().list(q=video_query, fields="files(id, name)").execute()
        videos = video_results.get('files', [])
        
        if not videos:
            print(f"!!! Nenhum vídeo encontrado para '{nome_candidato}'. Pulando.")
            continue

        video_file = videos[0]
        video_id = video_file['id']
        video_name_original = video_file['name']

        fixed_original_path = os.path.join('uploads', video_name_original)
        
        # --- LÓGICA DE DOWNLOAD ---
        print(f"Baixando vídeo: {video_name_original}")
        request = service.files().get_media(fileId=video_id)
        with io.FileIO(fixed_original_path, 'wb') as fh:
            downloader = MediaIoBaseDownload(fh, request)
            done = False
            while not done:
                status, done = downloader.next_chunk()
                print(f"Download {int(status.progress() * 100)}%.", end='\r')
        print("\nDownload concluído.")
        
        # --- LÓGICA DE ANÁLISE ---
        print(f"Analisando vídeo de '{nome_candidato}'...")
        processed_video_path, report_data = process_gym_video(fixed_original_path, 'processed')

        if not processed_video_path or not report_data:
            print(f"!!! Falha na análise da IA para '{nome_candidato}'. Pulando.")
            continue

        status = 'Aprovado' if report_data.get('precisao', 0) >= 85 and report_data.get('totalFlexoes', 0) >= 10 else 'Reprovado'

        # --- LÓGICA DE SALVAR NO BANCO ---
        print("Salvando resultados no banco de dados...")
        cursor.execute('''
            INSERT INTO candidatos (nome, data_analise, video_processado_path, video_original_path, total_flexoes,
                                    movimentos_corretos, movimentos_incorretos, tempo_execucao, precisao, status,
                                    velocidade_media, amplitude_minima)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            nome_candidato, date.today().strftime('%Y-%m-%d'), processed_video_path, fixed_original_path,
            report_data.get('totalFlexoes'), report_data.get('movimentosCorretos'), report_data.get('movimentosIncorretos'),
            report_data.get('tempoTotal'), report_data.get('precisao'), status,
            report_data.get('velocidadeMedia', 0), report_data.get('min_angle', 180)
        ))
        conn.commit()
        print(f"*** Candidato '{nome_candidato}' salvo com sucesso! ***")
        
    conn.close()
    print("\n--- SINCRONIZAÇÃO COMPLETA CONCLUÍDA! ---")

if __name__ == '__main__':
    sync_and_analyze()