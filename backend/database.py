# backend/database.py (Versão Finalíssima)
import sqlite3

def init_db():
    conn = sqlite3.connect('candidatos.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS candidatos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL UNIQUE,
            data_analise TEXT NOT NULL,
            video_processado_path TEXT NOT NULL,
            video_original_path TEXT NOT NULL,
            total_flexoes INTEGER,
            movimentos_corretos INTEGER,
            movimentos_incorretos INTEGER,
            tempo_execucao REAL, -- Mudado para REAL para cálculos
            precisao INTEGER,
            status TEXT,
            velocidade_media REAL,   -- <-- NOVA COLUNA
            amplitude_minima INTEGER -- <-- NOVA COLUNA
        )
    ''')
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()