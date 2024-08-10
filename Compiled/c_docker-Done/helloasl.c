#include<stdio.h>
#include<time.h>

int main()
{
    printf("Hello from ASL,");
    time_t t;
    time(&t);
    printf("\nThe current date is: %s", ctime(&t));
    return 0;
}