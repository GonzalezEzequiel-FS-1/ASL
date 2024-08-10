package main
import "time"
import "fmt"
	func main() {
		dt := time.Now()
    fmt.Println("Hello from ASL\nThe current date is:\n", dt.Format(time.ANSIC))
}