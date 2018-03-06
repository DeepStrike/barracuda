var lines = document.querySelectorAll('.line-reveal__elem');
console.log(lines);
for (var i = 0; i < lines.length; i++) {
	(function(line, time) {
		setTimeout(function() {
			line.classList.add('show');
		}, time)
	})(lines[i], i * 500);
}