FROM node:20-alpine AS base 
WORKDIR /app

#builder stage 
 
FROM base  AS builder 
COPY  package*.json ./
RUN npm install --omit=dev
COPY . .

#production stage 
FROM base AS production
COPY  --from=builder /app /package*.json ./
COPY --from=builder /app ./

EXPOSE 5000

CMD [ "npm","start" ]






