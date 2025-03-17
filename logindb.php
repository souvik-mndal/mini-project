<?php
    $db_server = "localhost";
    $db_user = "root";
    $db_pass = "";
    $db_name = "miniproject-sem4";
    $conn = "";

    $conn = mysqli_connect($db_server,$db_user,$db_pass,$db_name);
?>
<?php
    if(isset($_POST["newSubmit"])){
        $newUserName = filter_input(INPUT_POST,"newUsername",FILTER_SANITIZE_SPECIAL_CHARS);
        $newUserEmail = filter_input(INPUT_POST,"newUserEmail",FILTER_SANITIZE_EMAIL);
        $newUserPassword = filter_input(INPUT_POST,"newUserPassword",FILTER_SANITIZE_SPECIAL_CHARS);
        $loginType = $_POST["userType"];
        $sql = "INSERT INTO newuser (userName,userEmail,userPassword,loginType)
                VALUES ('$newUserName','$newUserEmail','$newUserPassword','$loginType')";
        try{
            mysqli_query($conn,$sql);
            echo "<h1>DATA INSERTED SUCCESSFULLY</h1>";
            header("Location:content.html");
        }
        catch(mysqli_sql_exception){
            header("Location: signup.html?error=Email has already been taken");
        }
    }
?>
<?php
    if(isset($_POST["loginSubmit"])){
        $loginEmail = filter_input(INPUT_POST,"oldUserEmail",FILTER_SANITIZE_EMAIL);
        $loginPassword = filter_input(INPUT_POST,"oldUserPassword",FILTER_SANITIZE_SPECIAL_CHARS);
        $sql = "SELECT * FROM newuser WHERE userEmail = '$loginEmail' AND userPassword = '$loginPassword'";
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result)==1){
            header("Location:content.html");
        }
        else{
            header("Location: login.html?error=Invalid email or password. Please try again.");
        }
    }
?>
<?php
    mysqli_close($conn);
?>