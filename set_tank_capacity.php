<?php
$hostname = 'localhost';
$username = "id20516053_root";
$password = "}xaLzNj4P*y=c9&^";
$dbname = "id20516053_chemicals";
$conn = mysqli_connect($hostname,$username,$password,$dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

       
    if(isset($_GET['tank_capacity']) )
    {
       
                $sql = "UPDATE `tank` SET tank_capacity=".$_GET['tank_capacity'];
                //echo $sql;
                if ($conn->query($sql) === TRUE) 
                {
       echo '{"status ": " sucess"}';
                } 
                else 
                {
              echo '{"status ": " error"}';
                }             
    }        
              
                 
             

/* close connection */
mysqli_close($conn);

?>