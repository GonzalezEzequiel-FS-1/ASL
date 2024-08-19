# Use the i386 version of Ubuntu
FROM i386/ubuntu:latest

# Install necessary tools
RUN apt-get update && apt-get install -y nasm gcc

# Set the working directory
WORKDIR /usr/src/app

# Copy the assembly source code into the container
COPY helloasl.asm .

# Assemble the code
RUN nasm -f elf helloasl.asm -o helloasl.o

# Link the object file
RUN ld -m elf_i386 helloasl.o -o helloasl

# Command to run the executable
CMD ["./helloasl"]
