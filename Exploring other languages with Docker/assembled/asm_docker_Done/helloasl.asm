;Working!!!
section .data
    hello db 'Hello ASL!',0xA
    date db 'Today is 2024-08-06',0xA

section .text
    global _start

_start:
    ; Print "Hello ASL!"
    mov eax, 4            ; sys_write
    mov ebx, 1            ; file descriptor 1 (stdout)
    mov ecx, hello        ; pointer to the hello message
    mov edx, 12           ; length of the message
    int 0x80              ; call kernel

    ; Print the date
    mov eax, 4            ; sys_write
    mov ebx, 1            ; file descriptor 1 (stdout)
    mov ecx, date         ; pointer to the date message
    mov edx, 20           ; length of the message
    int 0x80              ; call kernel

    ; Exit
    mov eax, 1            ; sys_exit
    xor ebx, ebx          ; exit code 0
    int 0x80              ; call kernel