function demo(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
Element.prototype.clear = function() {
	this.outerHTML = '';
}
async function sleep() {
  await demo(2000);
}

demo();
function max() {
    res = arguments[0];
    for (i = 1; i < arguments.length; i++) {
        if (arguments[i] > res)
            res = arguments[i];
    }
    return res;
}
function min() {
    res = arguments[0];
    for (i = 1; i < arguments.length; i++) {
        if (arguments[i] < res)
            res = arguments[i];
    }
    return res;
}
function LeoHeap(canvas) {
    this.elems = [];
    this.canvas = canvas;
	this.size = 0;
	this.ar = []; // Массив со значениями
	this.count = []; // Тут будут храниться размеры соответствующих поддеревьев
	this.num = []; // А тут - номера соответствующих чисел Леонардо
	this.right = function(i) {
		t = i - 1;
		if ((t < 0) || (this.num[t] != this.num[i] - 2))
			return -1;
		return t;
	}
	this.prev = function(i) {
		if (i < 0)
			return -1;
		var t = i - this.count[i];
		if (t < 0)
			return -1;
		return t;
	}
	this.left = function(i) {
		return this.prev(this.right(i));
	}
	this.heapify = function(i) { // By default heapifies the top heap
		pos = i;
		var l = this.left(pos);
		var r = this.right(pos);
		var j = 0
		while ((l >= 0) && ((this.ar[r] < this.ar[pos]) || (this.ar[l] < this.ar[pos]))) {
			if (ar[l] < ar[r]) {
				[this.ar[l], this.ar[pos]] = [this.ar[pos], this.ar[l]];
				setTimeout(swapElements, j * 800, this.elems[l], this.elems[pos]);
				[this.elems[l], this.elems[pos]] = [this.elems[pos], this.elems[l]];
				pos = l;
			}
			else {
				[this.ar[r], this.ar[pos]] = [this.ar[pos], this.ar[r]];
				setTimeout(swapElements, j * 800, this.elems[r], this.elems[pos]);
				[this.elems[r], this.elems[pos]] = [this.elems[pos], this.elems[r]];
				pos = r;
			}
			//await demo(4000);
			l = this.left(pos);
			r = this.right(pos);
			j++;
		}
	}
	this.insert = function(value) {
		this.ar.push(value);
		if (this.size == 0) {
			this.num.push(1);
			this.count.push(1);
			this.elems.push(addElem(value));
		    this.elems[0].dropAt(30, 30, this.canvas);
			this.size = 1;
			return;
		}
		var r = this.size - 1;
		var p = this.prev(r);
		if (p == -1) {
		    if (this.num[r] == 1) {
                this.num.push(0);
			    this.count.push(1);
		    }
		    else {
                this.num.push(1);
                this.count.push(1);
			}
		}
		else {
            if (this.num[p] != this.num[r] + 1) {
                if (this.num[r] == 1) {
                    this.num.push(0);
                    this.count.push(1);
                }
                else {
                    this.num.push(1);
                    this.count.push(1);
                }
            }
            else {
                this.num.push(this.num[p] + 1);
                this.count.push(this.count[r] + this.count[p] + 1);
            }
		}
		this.elems.push(addElem(value));
		var height;
		if (this.num[size] < 2)
		    height = 30;
		else
		    height = 30 + (this.num[size] - 1) * 80;
		this.elems[size].dropAt(30 + size * 90, height, this.canvas);
		this.size++;
		setTimeout(this.heapify, 1500, size - 1);
	}
	this.pop = function(elems) {
		var max_root = this.size - 1;
		var t = this.prev(this.size - 1);
		while (t >= 0) {
			if (this.ar[t] < this.ar[max_root])
				max_root = t;
			t = this.prev(t);
		}
		[this.ar[max_root], this.ar[size - 1]] = [this.ar[size - 1], this.ar[max_root]];
		swapElements(this.elems[max_root], this.elems[size - 1]);
		[this.elems[max_root], this.elems[size - 1]] = [this.elems[size - 1], this.elems[max_root]];
		x = this.ar[this.size - 1];
		this.num.pop();
		this.count.pop();
		this.ar.pop();
		var el = this.elems[size - 1];
		el.style.backgroundColor = 'red';
		setTimeout(function(){el.outerHTML='';}, 600);
		this.elems.pop();
		this.size--;
		setTimeout(this.heapify, 1500, max_root);
		return x;
	}
	this.sort = function(ar, canvas) {
		var h = LeoHeap(canvas);
		for (var i = 0; i < ar.length; i++) {
		    setTimeout(h.insert, i * 2000, ar[i]);
		}
	}
	this.clear = function() {
	    for (var i = 0; i < this.size; i++)
	        this.elems[i].outerHTML = '';
	}
	return this;
}
function makeElem(value) {
    element = document.createElement('div');
    element.classList.add('elem');
    element.innerHTML = value.toString();
    element.putAt = function(x, y, parent){
        element.style.left = parent.offsetLeft + 1.0 + x + 'px';
        element.style.top = parent.offsetTop + 1.0 + y + 'px';
    }
    element.dropAt = function(x, y, parent){
        element.putAt(x, parseFloat(window.getComputedStyle(parent).height) - parseFloat(window.getComputedStyle(element).height) - y - 1, parent);
    }
    return element;
}
function addElem(value) {
    element = makeElem(value);
    myCanvas.appendChild(element);
    element.putAt(0, 0, myCanvas);
    element.style.width = max(element.clientHeight, element.clientWidth) + 'px';
    return element;
}
function swapElements(a, b) {
    c = b.style.left;
    b.style.left = a.style.left;
    a.style.left = c;
    c = b.style.top
    b.style.top = a.style.top;
    a.style.top = c;
}
var h = {};
but.onclick = function(){
    if (h.clear)
        h.clear();
    out.innerHTML = '';
    arr = array.value.split(' ').map(parseFloat);
    if (reversed.checked)
        arr = arr.reverse();
    h = LeoHeap();
    h.sort(arr, myCanvas);
}
popbut.onclick = function() {
    var x = h.pop();
    setTimeout(function(){out.innerHTML += x + ' ';}, 600);
}