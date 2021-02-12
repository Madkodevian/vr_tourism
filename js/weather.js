var xmlDoc = True;
if (window.ActiveXObject) {// code for IE
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
}
else if (document.implementation.createDocument) {// code for Mozilla, Firefox, Opera, etc.
    xmlDoc = document.implementation.createDocument("", "", Null);
}
else {
    alert('Tu navegador no soporta esta funcion');
}
if (xmlDoc = True) {
    xmlDoc.async = false;
    xmlDoc.load("../xml/weather-1.xml");
    var x = xmlDoc.getElementsByTagName("CD");

    document.write("<table border='1'>");
    document.write("<thead>");
    document.write("<tr><th>Artista</th><th>Album</th></tr>");
    document.write("</thead>");

    document.write("<tfoot>");
    document.write("<tr><th colspan='2'>Esta es mi coleccion de albums</th></tr>");
    document.write("</tfoot>");

    for (var i = 0; i < x.length; i++) {
        document.write("<tr>");
        document.write("<td>");
        document.write(x[i].getElementsByTagName("ARTISTA")[0].childNodes[0].nodeValue);
        document.write("</td>");

        document.write("<td>");
        document.write(x[i].getElementsByTagName("TITULO")[0].childNodes[0].nodeValue);
        document.write("</td>");
        document.write("</tr>");
    }
    document.write("</table>");
}