import java.text.SimpleDateFormat;
import java.util.Date;

class helloAsl {
    public static void main(String []args)
    {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyy HH:mm:ss");
        Date date = new Date();
        System.out.println("Hello from ASL,\nThe current date is: \n"+formatter.format(date));
    }
};