<html>
<head></head>
<body>
<?php
echo exec('whoami');
echo "<br>";
system('ls', $salida);
echo $salida;
 ?>
</body>
</html>