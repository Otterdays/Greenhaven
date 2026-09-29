# Greenhaven

## **[Play on the website — otterdays.github.io/Greenhaven](https://otterdays.github.io/Greenhaven/)**

A native 2D MMORPG built with Rust and Bevy. One shared meadow, four skill ladders, three worlds on one account, and a character that stays.

## Downloads

| Platform | Link |
| --- | --- |
| Windows | [GreenhavenSetup-0.1.14.exe](https://www.dropbox.com/scl/fi/iqm4wdhoavuy34shtk5uk/GreenhavenSetup-0.1.13.exe?rlkey=kvdl89gdvqy2dt6snchp9qbjc&dl=1) |
| Linux | [Greenhaven-linux-20260917.tar.gz](https://www.dropbox.com/scl/fi/879lr5t2764r40r1vs7pr/Greenhaven-linux-20260917.tar.gz?rlkey=p2utkld8kdhymnxmqbs8xuqi9&st=f24wg89z&dl=1) |

## The game

- **Chop, mine, dig, fish** — nine tree kinds, twenty rock kinds, six fish, sand and clay
- **Skill ladders to 99** — Woodcutting, Mining, Fishing, Stride; every XP point saved
- **Fighting is real** — hostile mobs attack, server-dealt damage, mob loot, earnable familiar pets
- **Hallowmere** — a full Halloween town with seven creatures and a level 45 boss
- **Sprint the trails** — hold Shift for 2x speed; fresh ground trains Stride
- **Three worlds, one Ottertown** — one account, live world status in the menu
- **One shared meadow** — live chat, saved characters, villagers that talk back, a merchant
- **First person, world map, skills sheet** — F5, M, P; F1 lists every key

## This repo

The native client is not this site. This repo holds the porch website: home, how to play, and the world pages. Static HTML, one stylesheet, one script, no build step — served by GitHub Pages from `main`.

| File | Page |
| --- | --- |
| `index.html` | Home: full-bleed meadow hero, live world status bar, one closing CTA — everything else lives on the pages below |
| `play.html` | How to play: gameplay window, what you can do, three steps, controls, what a click does, first ten minutes |
| `world.html` | The world: landmarks, ground rules, who lives there (schematic map offline for now) |
| `skills.html` | Skill ladders: four skills to 99, real XP tables, stats |
| `news.html` | News: filterable card grid (topic chips + release index), one card per shipped feature |
| `download.html` | Download: Windows/Linux cards, FAQ, the three worlds, dev note |
| `style.css` | "Lantern night" theme — tokens on `:root`, responsive to 360px, honours `prefers-reduced-motion` |
| `site.js` | Nav toggle, scroll reveal, counters, ladder tabs, page-head stars, hero dust motes |

Media in `assets/` (hero meadow art, gameplay GIF, walk sprite, Happy Yak mascot) comes from the game project.

## License

See [LICENSE](LICENSE).
