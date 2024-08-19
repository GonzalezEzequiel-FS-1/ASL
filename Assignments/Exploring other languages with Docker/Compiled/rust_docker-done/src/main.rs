use chrono;

fn main() {
    println!("Hello from ASL\nThe current date is:");
    // returns DateTime<Local>
    println!("{:?}", chrono::offset::Local::now());
}
