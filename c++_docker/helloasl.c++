#include <iostream>
#include <ctime>

int main() {
    std::cout << "Hello ASL!" << std::endl;

    time_t now = time(0);
    tm *ltm = localtime(&now);

    std::cout << "Today's date is " 
              << 1900 + ltm->tm_year << "-"
              << 1 + ltm->tm_mon << "-"
              << ltm->tm_mday << std::endl;

    return 0;
}
