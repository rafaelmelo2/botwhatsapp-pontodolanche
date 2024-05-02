# Use a imagem Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instale a biblioteca libnss3
RUN apt-get update && apt-get install -y libnss3 && npm install puppeteer

# Copie o arquivo package.json e o arquivo package-lock.json (se existir) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Execute o comando de build (se necessário)
RUN npm run build

# Exponha a porta em que o aplicativo está sendo executado
EXPOSE 3000

# Comando para iniciar o aplicativo quando o contêiner for iniciado
CMD ["npm", "start"]
