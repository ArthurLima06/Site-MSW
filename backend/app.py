from flask import Flask, request, jsonify
from flask_cors import CORS
import os, json, pathlib, smtplib
from email.message import EmailMessage

app = Flask(__name__)
CORS(app)

EMAIL_RECEIVER = os.getenv('EMAIL_RECEIVER', 'contato@mswlocacoes.com.br')
SMTP_HOST = os.getenv('SMTP_HOST')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_USER = os.getenv('SMTP_USER')
SMTP_PASS = os.getenv('SMTP_PASS')

@app.route('/api/machines')
def machines():
    p = pathlib.Path(__file__).parents[1] / 'frontend' / 'src' / 'data' / 'machines.json'
    if p.exists():
        return jsonify(json.loads(p.read_text(encoding='utf-8')))
    return jsonify([])

@app.route('/api/quote', methods=['POST'])
def quote():
    data = request.json or {}
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    items = data.get('items', [])
    message = data.get('message', '')

    if not (name and (email or phone) and items):
        return jsonify({'ok': False, 'error': 'Campos obrigatórios faltando'}), 400

    try:
        msg = EmailMessage()
        msg['Subject'] = f'Orçamento: {name} - {len(items)} itens'
        msg['From'] = SMTP_USER or 'no-reply@mswlocacoes.com.br'
        msg['To'] = EMAIL_RECEIVER

        body = [f'Nome: {name}', f'E-mail: {email}', f'Telefone: {phone}', '', 'Itens:']
        for it in items:
            body.append(f"- {it.get('category')} / {it.get('model')} x {it.get('qty',1)}")
        body.append('')
        body.append('Mensagem:')
        body.append(message)

        msg.set_content('\n'.join(body))

        if not SMTP_HOST:
            print('--- Email não enviado (SMTP não configurado). Conteúdo: ---')
            print(msg)
        else:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                server.starttls()
                if SMTP_USER and SMTP_PASS:
                    server.login(SMTP_USER, SMTP_PASS)
                server.send_message(msg)

        return jsonify({'ok': True})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
