let lastHintPosition = '';
let lastHintTimeout;

window.addEventListener("message", (event) => {
    const data = event.data;
    switch (data.action) {
        case 'showHintUI':
            lastHintPosition = data.position;
            const newHint = $(`
            <div class="hint-wrapper ${data.position} ${data.position}-in">
                <h2>${data.title || 'Example Text'}</h2>
                <hr>
                <div class="hint-container">
                    <span>${data.text || 'Example text'}</span>
                </div>
            </div>`);
            $('body').append(newHint);
            if (data.timeout) {
                lastHintTimeout = setTimeout(() => {
                    newHint.removeClass(`${data.position}-in`);
                    newHint.addClass(`${data.position}-out`);
                    setTimeout(() => {
                        newHint.remove();
                    }, 700);
                }, data.timeout);
            }
            break;
        case 'hideHintUI':
            if (lastHintTimeout) {clearTimeout(lastHintTimeout)};
            const oldHint = $('.hint-wrapper');
            oldHint.removeClass(`${lastHintPosition}-in`);
            oldHint.addClass(`${lastHintPosition}-out`);
            setTimeout(() => {
                oldHint.remove();
            }, 700);
            break;
    }
})