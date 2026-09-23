# Greenhaven

## **[Play on the website — otterdays.github.io/Greenhaven](https://otterdays.github.io/Greenhaven/)**

A native 2D MMORPG built with Rust and Bevy. One shared meadow, four skill ladders, three worlds on one account, and a character that stays.

## Downloads

| Platform | Link |
| --- | --- |
| Windows | [GreenhavenSetup-0.1.12.exe](https://www.dropbox.com/scl/fi/ai26ndghikz5en0n1o43k/GreenhavenSetup-0.1.12.exe?rlkey=otazayvv17yf8zskkdz5i5oyn&dl=1) |
| Linux | [Greenhaven-linux-20260917.tar.gz](https://www.dropbox.com/scl/fi/879lr5t2764r40r1vs7pr/Greenhaven-linux-20260917.tar.gz?rlkey=p2utkld8kdhymnxmqbs8xuqi9&st=f24wg89z&dl=1) |

## The game

- **Chop, mine, dig, fish** — nine tree kinds, twenty rock kinds, six fish, sand and clay
- **Skill ladders to 99** — Woodcutting, Mining, Fishing, Stride; every XP point saved
- **Sprint the trails** — hold Shift for 2x speed; fresh ground trains Stride
- **Three worlds, one Ottertown** — one account, live world status in the menu
- **One shared meadow** — live chat, saved characters, villagers that talk back, a merchant
- **First person, world map, skills sheet** — F5, M, P; F1 lists every key

## This repo

The native client is not this site. This repo holds the porch website: home, how to play, and the world pages. Static HTML, one stylesheet, one script, no build step — served by GitHub Pages from `main`.

| File | Page |
| --- | --- |
| `index.html` | Home: hero, features, skill ladders (real numbers from the shared rules crate), worlds, villagers, what's new, download, FAQ |
| `play.html` | How to play: three steps, controls, what a click does, first ten minutes |
| `world.html` | The world: schematic map, landmarks, ground rules, who lives there |
| `style.css` | "Lantern night" theme — tokens on `:root`, responsive to 360px, honours `prefers-reduced-motion` |
| `site.js` | Nav toggle, scroll reveal, counters, ladder tabs, hero stars and parallax hills |

Media in `assets/` (gameplay GIF, walk sprite, Happy Yak mascot) comes from the game project.

## License

See [LICENSE](LICENSE).
