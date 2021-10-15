const record = document.getElementById("record"),
    shot = document.getElementById('shot'),
    hit = document.getElementById('hit'),
    dead = document.getElementById('dead'),
    enemy = document.getElementById('enemy'),
    again = document.getElementById('again'),
    header = document.querySelector('.header');

const game = {
    ships: [],
    shipCount: 0,
    optionShip: {
        count: [1],
        size: [4, 3, 2, 1]
    },
    generateShip() {
        for (let i = 0; i < this.optionShip.count.length; i++) {
            for (let j = 0; j < this.optionShip.size[i]; j++){
               const size = this.optionShip.size[i];
               const ship = this.generateOptionsShip(size);
               this.ships.push(ship);
               this.shipCount++;

            }
        }
    },
    generateOptionsShip(shipSize) {
        const ship = {
            hit: [],
            location: [],
        };

        const direction = Math.random() < 0.5;
        // [0 до 0,99999]
        // [0 - 0.49999 ] / [0.5 - 0.99999 ]

        if (direction) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } else {
           
        }

        return ship;
    }
}

const play = {
    record: localStorage.getItem('seaBattleRecord') || 0,
    shot: 0,
    hit: 0,
    dead: 0,
    set updateData(data) {
        this[data] += 1;
        this.render();
    },
    render() {
        record.textContent = this['record'];
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    }
};

const show = {
    hit(elem) {
        this.changeClass(elem, "hit");
    },
    miss(elem) {
        this.changeClass(elem, "miss");
    },
    dead(elem) {
        this.changeClass(elem, "dead");
    },
    changeClass(elem, value) {
        elem.className = value;
    }
};

const fire = (event) => {
    const target = event.target;
    if (target.classList.length !== 0 ||
        target.tagName !== "TD" ||
        !game.shipCount) return;
    show.miss(target);
    play.updateData = 'shot';

    for (let i=0; i < game.ships.length; i++){
        const ship = game.ships[i],
            index = ship.location.indexOf(target.id);
        if (index >= 0) {
            show.hit(target);
            play.updateData = "hit";
            ship.hit[index] = 'x';
            const life = ship.hit.indexOf('');
            if (life < 0) {
                play.updateData = "dead";
                for (const id of ship.location) {
                    show.dead(document.getElementById(id));
                }

                game.shipCount -= 1;
                
                if (!game.shipCount) {
                    header.textContent = "Игра окончена!";
                    header.style.color = "red";

                    if (play.shot < play.record || play.record === 0) {
                        localStorage.setItem('seaBattleRecord', play.shot);
                        play.record = play.shot;
                        play.render();
                    }               
                }
            }
        }
    }
};

const init = () => {
    enemy.addEventListener("click", fire);
    play.render();
    game.generateShip();
    again.addEventListener('click', () => {
        location.reload();
    });
    record.addEventListener('dblclick', ()=> {
        localStorage.clear();
        play.record = 0;
        play.render();
    });

    console.log(game.ships);
};

init();