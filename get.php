<?
$username="virostat_data";
$password="Kurac@67cm";
$database="virostat_webapps";

$id = $_REQUEST["id"];




$conn = mysql_connect(localhost,$username,$password);
if ($conn) {
	@mysql_select_db($database) or die( "Unable to select database");
	$query = "SELECT id,username,loopname,bpm FROM evol";
	$result = mysql_query($query);
	if ( $result === false ) {
	  die("Can\'t do that: " . mysql_error());
	}	
	else {
		$retVal = array();
		while( $row = mysql_fetch_array( $result ) ) {
		  $retVal[] = $row;
		}		
	}
	header('Content-Type: application/json');
	echo json_encode( $retVal );
}
else echo "no connection";


mysql_close($conn);
?>