# backend/video_processor.py (Versão Corrigida FINAL)

import cv2
import uuid
import os
import ffmpeg
from ultralytics import solutions

def fix_video_for_web(input_path, output_path):
    print(f"Finalizando vídeo: '{output_path}' com FFmpeg")
    try:
        (
            ffmpeg.input(input_path)
            .output(output_path, vcodec='libx264', pix_fmt='yuv420p', movflags='+faststart')
            .run(overwrite_output=True, quiet=True)
        )
        print("Vídeo finalizado com sucesso!")
        return True
    except ffmpeg.Error as e:
        print("Erro do FFmpeg:", e.stderr.decode() if e.stderr else "Erro desconhecido")
        return False

def process_gym_video(input_path, output_folder, model_path="yolo11m-pose.pt"):
    cap = cv2.VideoCapture(input_path)
    if not cap.isOpened():
        return None, {"error": "Erro ao abrir o arquivo de vídeo para análise."}

    w, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS))
    os.makedirs(output_folder, exist_ok=True)
    
    unique_id = uuid.uuid4()
    final_filename = f"{unique_id}.mp4"
    final_output_path = os.path.join(output_folder, final_filename)
    temp_output_path = os.path.join(output_folder, f"temp_{unique_id}.mp4")

    video_writer = cv2.VideoWriter(temp_output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (w, h))

    # ---- ATUALIZAÇÃO IMPORTANTE NOS PARÂMETROS DA IA (AGORA COM OS NOMES CERTOS) ----
    gym_object = solutions.AIGym(
        show=False,
        kpts=[6, 8, 10],
        model=model_path,
        up_angle=130.0,   # <-- NOME CORRETO
        down_angle=95.0,  # <-- NOME CORRETO
    )
    
    frame_count = 0
    movimentos_corretos = 0
    movimentos_incorretos = 0
    min_angle_geral = 180
    last_stage = "up"
    amplitude_ok_na_repeticao_atual = False

    print("Iniciando análise de frames com lógica de movimento correto/incorreto...")
    while cap.isOpened():
        success, frame = cap.read()
        if not success: break
        
        frame_count += 1
        results = gym_object(frame)
        processed_frame = results.plot_im
        video_writer.write(processed_frame)

        current_stage = results.workout_stage[0] if results.workout_stage else last_stage
        current_angle = results.workout_angle[0] if results.workout_angle else 180
        
        if current_stage == 'down':
            if current_angle < min_angle_geral:
                min_angle_geral = current_angle
            if not amplitude_ok_na_repeticao_atual and current_angle <= 90:
                amplitude_ok_na_repeticao_atual = True
        
        if last_stage == 'down' and current_stage == 'up':
            if amplitude_ok_na_repeticao_atual:
                movimentos_corretos += 1
                print(f"Movimento CORRETO contado! Total: {movimentos_corretos}")
            else:
                movimentos_incorretos += 1
                print(f"Movimento INCORRETO detectado (amplitude insuficiente). Total: {movimentos_incorretos}")
            amplitude_ok_na_repeticao_atual = False
        last_stage = current_stage
    
    print("Análise de frames concluída.")
    cap.release()
    video_writer.release()

    if not fix_video_for_web(temp_output_path, final_output_path):
        os.remove(temp_output_path)
        return None, {"error": "Falha ao finalizar o vídeo processado."}
    
    if os.path.exists(temp_output_path):
        os.remove(temp_output_path)

    total_flexoes = movimentos_corretos + movimentos_incorretos
    tempo_total_seg = frame_count / fps if fps > 0 else 0
    velocidade_media = (total_flexoes / (tempo_total_seg / 60)) if tempo_total_seg > 0 else 0
    precisao = (movimentos_corretos / total_flexoes * 100) if total_flexoes > 0 else 100

    report_data = {
        "totalFlexoes": total_flexoes,
        "movimentosCorretos": movimentos_corretos,
        "movimentosIncorretos": movimentos_incorretos,
        "tempoTotal": round(tempo_total_seg, 2),
        "precisao": int(precisao),
        "min_angle": int(min_angle_geral),
        "velocidadeMedia": round(velocidade_media, 2)
    }
    
    return final_output_path, report_data