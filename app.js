/**
 * Created by kib357 on 17/01/15.
 */

acManager = {};

var colors = ['white', 'black', 'blue', 'beige', 'brown'];

var setTextSize = function (e) {
    e.preventDefault();
    var size = this.getAttribute('data-text-size');
    for (var i = 0; i < 3; i++) {
        document.body.classList.remove('ac-text-size-' + i);
    }
    var buttons = document.getElementsByClassName('ac-size-option');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i] !== this) {
            buttons[i].classList.remove('ac-active-size');
        }
    }
    this.classList.add('ac-active-size');
    document.body.classList.add('ac-text-size-' + size);
    console.log('Set size:' + size);
    localStorage.setItem('ac-text-size', size);
};

var setColor = function (e) {
    e.preventDefault();
    var color = this.getAttribute('data-color');
    console.log('Set color:' + color);
    for (var i = 0; i < colors.length; i++) {
        document.body.classList.remove('ac-' + colors[i]);
    }
    var buttons = document.getElementsByClassName('ac-color-option');
    for (i = 0; i < buttons.length; i++) {
        if (buttons[i] !== this) {
            buttons[i].classList.add('hidden');
            buttons[i].classList.remove('ac-active-option');
        }
    }
    this.classList.remove('hidden');
    this.classList.add('ac-active-option');
    var toggle = document.getElementById('acToggleColors');
    toggle.innerHTML = 'изменить';
    document.body.classList.add('ac-' + color);
    localStorage.setItem('ac-color', color);
};

var toggleImages = function (e) {
    e.preventDefault();
    console.log('Toggle images');
    var checkedIcon = this.childNodes[1];
    if (checkedIcon.classList.contains('hidden')) {
        checkedIcon.classList.remove('hidden');
        document.body.classList.remove('ac-hide-images');
        localStorage.setItem('ac-hide-images', 'false');
        this.setAttribute('data-hide-images', 'false');
    } else {
        checkedIcon.classList.add('hidden');
        document.body.classList.add('ac-hide-images');
        localStorage.setItem('ac-hide-images', 'true');
        this.setAttribute('data-hide-images', 'true');
    }
};

var renderTitle = function (titleText) {
    var title = document.createElement('span');
    title.className = 'ac-settings-section';
    title.innerHTML = titleText;
    return title;
};

var renderTextSizeButton = function (size) {
    var a = document.createElement('a');
    a.setAttribute('href', '');
    a.className = 'ac-settings-option ac-size-option';
    a.setAttribute('data-text-size', size);
    var i = document.createElement('i');
    switch (size) {
        case 0:
            i.className = 'fa fa-font';
            break;
        case 1:
            i.className = 'fa fa-font fa-lg';
            i.style.verticalAlign = '0%';
            break;
        case 2:
            i.className = 'fa fa-font fa-2x';
            break;
    }
    a.appendChild(i);
    a.addEventListener('click', setTextSize);
    return a;
};

var renderColorButton = function (color) {
    var a = document.createElement('a');
    a.setAttribute('href', '');
    a.className = 'ac-settings-option ac-color-option hidden';
    a.setAttribute('data-color', color);
    var i = document.createElement('i');
    i.className = 'fa fa-header fa-lg fa-border ac-' + color;
    a.appendChild(i);
    a.addEventListener('click', setColor);
    return a;
};

var renderTextSizes = function (container) {
    container.appendChild(renderTitle('Размер шрифта:'));
    for (var i = 0; i < 3; i++) {
        container.appendChild(renderTextSizeButton(i));
    }
};

var renderColors = function (container) {
    container.appendChild(renderTitle('Цвета сайта:'));
    container.appendChild(renderColorButton('white'));
    container.appendChild(renderColorButton('black'));
    container.appendChild(renderColorButton('blue'));
    container.appendChild(renderColorButton('beige'));
    container.appendChild(renderColorButton('brown'));

    var toggle = document.createElement('a');
    toggle.setAttribute('href', '');
    toggle.innerHTML = 'изменить';
    toggle.setAttribute('id', 'acToggleColors');
    toggle.className = 'ac-link-button';
    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        var buttons = document.getElementsByClassName('ac-color-option');
        if (this.innerHTML === 'изменить') {
            this.innerHTML = 'отмена';
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('hidden');
            }
        } else {
            this.innerHTML = 'изменить';
            for (var i = 0; i < buttons.length; i++) {
                if (!buttons[i].classList.contains('ac-active-option')) {
                    buttons[i].classList.add('hidden');
                }
            }
        }
    });
    container.appendChild(toggle);
};

var renderImagesToggle = function (container) {
    container.appendChild(renderTitle('Изображения:'));
    var a = document.createElement('a');
    a.setAttribute('href', '');
    a.className = 'fa-stack';
    var iBorder = document.createElement('i');
    iBorder.className = 'fa fa-square-o fa-stack-2x';
    var iChecked = document.createElement('i');
    iChecked.className = 'fa fa-check fa-stack-1x';
    a.appendChild(iBorder);
    a.appendChild(iChecked);
    a.addEventListener('click', toggleImages);
    a.setAttribute('id', 'acToggleImages');
    a.setAttribute('data-hide-images', 'false');
    container.appendChild(a);
};

var applySettings = function () {
    var color = localStorage.getItem('ac-color');
    var colorOptions = document.getElementsByClassName('ac-color-option');
    var currentColorOption = colorOptions[0];
    for (var i = 1; i < colorOptions.length; i++) {
        if (colorOptions[i].getAttribute('data-color') === color) {
            currentColorOption = colorOptions[i];
        }
    }
    setColor.apply(currentColorOption, [{'preventDefault': function () {}}]);

    var size = localStorage.getItem('ac-text-size');
    var sizeOptions = document.getElementsByClassName('ac-size-option');
    var currentSizeOption = sizeOptions[1];
    for (i = 0; i < sizeOptions.length; i++) {
        if (sizeOptions[i].getAttribute('data-text-size') === size) {
            currentSizeOption = sizeOptions[i];
        }
    }
    setTextSize.apply(currentSizeOption, [{'preventDefault': function () {}}]);

    var hideImages = localStorage.getItem('ac-hide-images');
    var imagesOption = document.getElementById('acToggleImages');
    if (hideImages !== imagesOption.getAttribute('data-hide-images')) {
        toggleImages.apply(imagesOption, [{'preventDefault': function () {}}])
    }
};

var disable = function (e) {
    e.preventDefault();
    document.body.classList.remove('ac-text-size-0');
    document.body.classList.remove('ac-text-size-1');
    document.body.classList.remove('ac-text-size-2');
    document.body.classList.remove('ac-white');
    document.body.classList.remove('ac-black');
    document.body.classList.remove('ac-blue');
    document.body.classList.remove('ac-beige');
    document.body.classList.remove('ac-brown');
    document.body.classList.remove('ac-hide-images');
    var settings = document.getElementById('acSettings');
    if (typeof settings !== 'undefined' && settings !== null) {
        document.body.removeChild(settings);
    }
    acManager.startLink.classList.remove('hidden');
    localStorage.setItem('ac-enabled', 'false');
    //localStorage.setItem('ac-text-size', '1');
    //localStorage.setItem('ac-color', 'white');
    //localStorage.setItem('ac-hide-images', 'false');
    //applySettings();
};

var render = function () {
    var container = document.createElement('div');
    container.className = 'ac-settings';
    container.setAttribute('id', 'acSettings');
    renderTextSizes(container);
    renderColors(container);
    renderImagesToggle(container);
    var reset = document.createElement('a');
    reset.setAttribute('href', '');
    reset.className = 'ac-link-button';
    reset.addEventListener('click', disable);
    reset.innerHTML = 'Обычный режим';
    reset.style.marginLeft = '15px';
    container.appendChild(reset);

    document.body.appendChild(container);

    applySettings();

    acManager.startLink.classList.add('hidden');
    localStorage.setItem('ac-enabled', 'true');
};

acManager.enable = function (container) {
    var startLink = acManager.startLink = document.createElement('a');
    startLink.setAttribute('href','');
    var eyeIcon = document.createElement('i');
    eyeIcon.className = 'fa fa-eye fa-lg';
    startLink.appendChild(eyeIcon);
    startLink.innerHTML += ' Версия для слабовидящих';
    startLink.addEventListener('click', function (e) {
        e.preventDefault();
        render();
    });
    container.appendChild(startLink);
    if (localStorage.getItem('ac-enabled') === 'true') {
        render();
    }
};