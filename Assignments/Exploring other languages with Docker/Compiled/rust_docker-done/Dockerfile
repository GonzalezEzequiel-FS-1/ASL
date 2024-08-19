FROM rust:latest
WORKDIR /usr/src/app
COPY Cargo.toml Cargo.lock ./
COPY src/main.rs ./src/main.rs
RUN cargo build --release
CMD ["./target/release/helloasl"]
