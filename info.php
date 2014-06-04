<?
$username="virostat_data";
$password="Kurac@67cm";
$database="virostat_webapps";

$name = $_REQUEST["name"];
$json = $_REQUEST["json"];
$loop = $_REQUEST["loop"];
$bpm = $_REQUEST["bpm"];



$conn = mysql_connect(localhost,$username,$password);
if ($conn) {
	@mysql_select_db($database) or die( "Unable to select database");
	$query = "INSERT INTO evol (id, username, loopname, data, bpm, votes, linkcode) VALUES ('', '$name', '$loop', '$json', '$bpm', '0', 'qwertzui')";
	mysql_query($query);
	if(mysql_affected_rows() > 0){
		echo "\ntrue";
	}else{
		echo "\nMYSQL Error : ".die(mysql_error());
	}
	
}
else echo "no connection";


mysql_close($conn);
?>