# backend/app.py

import sqlite3
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from video_processor import process_gym_video # Nossa função agora retorna 2 valores11

# --- CONFIGURAÇÃO (mesma de antes) ---
app = Flask(__name__)
CORS(app) 
UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)


# --- API ENDPOINTS ---

@app.route('/api/analyze', methods=['POST'])
def analyze_video():
    if 'video' not in request.files:
        return jsonify({"error": "Nenhum arquivo de vídeo enviado"}), 400
    
    file = request.files['video']
    if file.filename == '':
        return jsonify({"error": "Nome de arquivo inválido"}), 400

    if file:
        filename = secure_filename(file.filename)
        input_video_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(input_video_path)

        # A função agora retorna o caminho E os dados
        output_video_path, report_data = process_gym_video(input_video_path, app.config['PROCESSED_FOLDER'])

        if output_video_path and report_data:
            # Pega o nome do arquivo para construir a URL
            output_filename = os.path.basename(output_video_path)
            
            # Monta a resposta final
            response_data = {
                "video_url": f"/processed/{output_filename}",
                "analysis_report": report_data
            }
            return jsonify(response_data)
        else:
            # `report_data` pode conter uma mensagem de erro específica
            error_message = report_data.get("error") if report_data else "Falha ao processar o vídeo"
            return jsonify({"error": error_message}), 500

# Rota para servir os vídeos processados (mesma de antes)
@app.route('/processed/<filename>')
def get_processed_video(filename):
    return send_from_directory(app.config['PROCESSED_FOLDER'], filename)

@app.route('/api/candidatos', methods=['GET'])
def get_candidatos():
    conn = sqlite3.connect('candidatos.db')
    conn.row_factory = sqlite3.Row # Isso permite acessar colunas por nome
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM candidatos ORDER BY nome ASC")
    candidatos = cursor.fetchall()
    conn.close()

    # Converte o resultado para uma lista de dicionários
    candidatos_list = [dict(row) for row in candidatos]
    
    return jsonify(candidatos_list)

@app.route('/api/candidato/<int:id>', methods=['GET'])
def get_candidato_detalhes(id):
    conn = sqlite3.connect('candidatos.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM candidatos WHERE id = ?", (id,))
    candidato = cursor.fetchone()
    
    conn.close()

    if candidato is None:
        return jsonify({"error": "Candidato não encontrado"}), 404
    
    return jsonify(dict(candidato))

# Rota para servir os vídeos da pasta UPLOADS
# (Necessária para o vídeo original)
@app.route('/uploads/<filename>')
def get_original_video(filename):
    # Nota: `os.path.basename` é uma medida de segurança
    # para evitar que usuários acessem arquivos fora da pasta uploads.
    return send_from_directory('uploads', os.path.basename(filename))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)