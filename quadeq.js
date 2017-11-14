var aVar;
var bVar;
var cVar;

$(document).keypress(function(e) {
    if(e.which == 13) {
        checkval();
    }
});

function checkval() {
	aVar = Number($('#aVar').val());
	bVar = Number($('#bVar').val());
	cVar = Number($('#cVar').val());
	
	if (aVar == undefined || bVar == undefined || cVar == undefined) {
		alert("value cannot be empty!");
	} else if (aVar === 0) {
		alert("a cannot be 0!");
	} else {
		$('#ans').css("display", "none");
		$('#deci').css("display", "none");
		calc();
	}
	
}

function negBracket(val) {
	if (val < 0) {
		return ("(" + bVar + ")");
	} else {
		return val;
	}
}

function calc() {
	// $x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$
	
	// 1. Display the user's input \(ax^2 + bx + c = 0\)
	var inputeq = "$" + aVar + "x^2";
	if (bVar < 0) {
		inputeq += bVar;
	} else if (bVar > 0) {
		inputeq += "+" + bVar;
	}
	if (bVar !== 0) {
		inputeq += "x";
	}
	if (cVar < 0) {
		inputeq += cVar;
	} else if (cVar > 0) {
		inputeq += "+" + cVar;
	}
	inputeq += "=0$";
	$('#inputans').text(inputeq);
	
	// 2. Show a, b and c
	var inputabc = "$a=" + aVar + ", b=" + bVar + ", c=" + cVar + "$";
	$('#inputabc').text(inputabc);
	
	// 3. Substitute
	var subabc = "$x = {-" + negBracket(bVar) + " \\pm \\sqrt{" + negBracket(bVar) + "^2-4(" + aVar + ")(" + cVar + ")} \\over 2(" + aVar + ")}$";
	$('#subfirst').text(subabc);
	
	// 4. Simplify
	var firstnum = -bVar;
	var secondnum = (Math.pow(bVar,2) - (4* aVar * cVar));
	var thirdnum = (2 * aVar);
	var simplifyabc = "$x = {" + firstnum + " \\pm \\sqrt{" + secondnum + "} \\over " + thirdnum + "}$";
	$('#simplify').text(simplifyabc);
	
	// 5. Calculate
	var calcres;
	var calc1 = (firstnum + Math.sqrt(secondnum)) / thirdnum;
	var calc2 = (firstnum - Math.sqrt(secondnum)) / thirdnum;
	if (secondnum < 0) {
		$('#ans').css("display", "block");
		$('#ans').text("Oops! You cannot square root a negative number!");
		$('#ans').css("color", "red");
	} else {
		$('#ans').css("color", "black");
		if (Math.sqrt(secondnum) % 1 === 0) { // Square number
			$('#ans').css("display", "block");
			calcres = "$x=$ $";
			if (calc1 !== calc2) { // Not equal
				if (calc1 % 1 !== 0) { // Not an integer
					if (calc1 < 0) { // Check if negative
						calcres += "-";
					}
					calcres += math.fraction(calc1).n + "\\over" + math.fraction(calc1).d;
				} else {
					calcres += calc1;
				}
				calcres += "$ or $"
				if (calc2 % 1 !== 0) {
					if (calc2 < 0) { // Check if negative
						calcres += "-";
					}
					calcres += math.fraction(calc2).n + "\\over" + math.fraction(calc2).d;
				} else {
					calcres += calc2;
				}
			} else {
				if (calc1 % 1 !== 0) {
					if (calc1 < 0) {
						calcres += "-";
					}
					calcres += math.fraction(calc1).n + "\\over" + math.fraction(calc1).d;
				} else {
					calcres += calc1;
				}
			}
			calcres += "$";
		}
		$('#ans').text(calcres);
		
		// 6. Show decimal form
		var decians = "In decimal: x = ";
		if (calc1 !== calc2) {
			decians += calc1 + " or " + calc2;
		} else {
			decians += calc1;
		}
		$('#deci').css("display", "block");
		$('#deci').text(decians)
	}
	
	$("#subfirst").css("font-size", "1.3em");
	$("#quadeqshow").css("font-size", "1.3em");
	$("#simplify").css("font-size", "1.3em");
	$("#ans").css("ans", "1.3em");
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	$("#answer").fadeIn();
}