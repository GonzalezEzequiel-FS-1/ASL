# Use the official GCC image from Docker Hub
FROM gcc:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the C++ source code into the container
COPY helloasl.cpp .

# Compile the C++ program
RUN g++ -o helloasl helloasl.cpp

# Command to run the executable
CMD ["./helloasl"]
