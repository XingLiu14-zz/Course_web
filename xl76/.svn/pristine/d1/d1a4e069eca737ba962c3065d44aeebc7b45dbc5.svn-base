/*
	Start picture rotation
*/
function changeImage(imgId, count) {
    var img = document.getElementById(imgId);
    var num = parseInt(imgId.substring(imgId.length - 1))
    img.src = imgSet[num][count];
    count++;


    if(count >= imgSet[num].length){
        count = 0;
    }
    return count
}

//Each iamge has its own image set
var imgSet = new Array(3)
for(var i = 0; i < 3; i++) {
	imgSet[i] = new Array(4)
}
imgSet[0][0] = "https://static.comicvine.com/uploads/original/11130/111300705/5442943-hanzo-genji-683ea7e3177666b7ee75bb5223a0b7aa5bc5b97f93b222ae23ad0322b50458548a134c883934ae9bac37b6af7e999a11a1450c64cf49c018c6557f4fea802dc3_yz6ucq.png"
imgSet[0][1] = "https://i.ytimg.com/vi/p_INcfVfd8Y/hqdefault.jpg"
imgSet[0][2] = "https://images2.alphacoders.com/710/thumb-1920-710137.png"
imgSet[0][3] = "https://i.ytimg.com/vi/sxKXx9hH8ZY/maxresdefault.jpg"

imgSet[1][0] = "https://www.cs.rice.edu/~keith/DuncanHall/Photos/bigfrontdoor.jpg"
imgSet[1][1] = "http://www.kendall-heaton.com/wp-content/uploads/2014/12/Rice-University-Anne-Charles-Duncan-Hall-1.jpg"
imgSet[1][2] = "https://lh6.googleusercontent.com/-F7Red_J6feM/TXBPFk67lSI/AAAAAAAABW0/fgS1C10RgyI/s1600/pod0303-1.jpg"
imgSet[1][3] = "https://media-cdn.tripadvisor.com/media/photo-s/02/b2/bd/ba/rice-university-campus.jpg"

imgSet[2][0] = "http://media.steampowered.com/apps/csgo/blog/images/fb_image.png?v=5"
imgSet[2][1] = "https://www.instant-gaming.com/images/products/62/screenshot/62-3.jpg"
imgSet[2][2] = "https://cdns.kinguin.net/media/category/1/4/1433501077_223-1024.jpg"
imgSet[2][3] = "https://cdn.vox-cdn.com/thumbor/9tcFMUrm9UUZjD7MAoDfi0-kUFs=/0x0:1280x720/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/49940385/csgo.0.jpg"

var count0 = 1
var count1 = 1
var count2 = 1
var image0
var image1
var image2

function begin() {
	image0 = startRotation(count0, 'img0')
	image1 = startRotation(count1, 'img1')
	image2 = startRotation(count2, 'img2')
}

function startRotation(count, img) {
	var inter = Math.floor(Math.random() * 5) + 1
	return setInterval(function() {
		count = changeImage(img, count)
	}, inter * 1000)
}

//Stop ot start rotation when botton been clicked
function clicked(btn, img, iter, imgId) {
	if(btn.value == "Stop") {	//when the picture is stop, make it start
		btn.value = "Start"
		Stop(img)
	}
	else {						//when the picture is rotating, make it stop
		btn.value = "Stop"
		img = Start(img, iter, imgId)
	}
	return img
}

//Stop the rotation
function Stop(image) {
	clearInterval(image);
}

//start the rotation again
function Start(image, iter, imgId) {
	var inter = Math.floor(Math.random() * 5) + 1
	image = setInterval(function() {
		iter = changeImage(imgId, iter)
	}, inter * 1000)
	return image
}

//when loaded, initiate the rotation
window.onload = begin()



