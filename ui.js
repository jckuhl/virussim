const ranges = ['#population', '#infectionRate', '#infectionRadius'];

ranges.forEach(id => {
    const range = document.querySelector(id);
    const span = document.querySelector(`label[for="${range.id}"] span`);
    span.textContent = range.value;
    range.addEventListener('input', event => {
        span.textContent = event.target.value;
    });
});

const ButtonState = Object.freeze({
    START: 'start',
    STOP: 'stop'
});

const simulationButton = document.querySelector('#simButton');

function setButtonState(state) {
    simulationButton.dataset.state = state;
    simulationButton.textContent = simulationButton.dataset.state.slice(0,1).toUpperCase()
                                    + simulationButton.dataset.state.slice(1).toLowerCase();
}

setButtonState(ButtonState.START);

simulationButton.addEventListener('click', event => {
    if(event.target.dataset.state === ButtonState.START) {
        setButtonState(ButtonState.STOP);
        ranges.forEach(id => document.querySelector(id).disabled = true)
    } else {
        setButtonState(ButtonState.START);
        ranges.forEach(id => document.querySelector(id).disabled = false)
    }
});