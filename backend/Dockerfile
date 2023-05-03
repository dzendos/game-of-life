# syntax=docker/dockerfile:1

FROM golang:1.19-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY api api
COPY cmd cmd
COPY internal internal

RUN go build -o /main cmd/service/main.go

EXPOSE 8080

CMD [ "/main" ]

