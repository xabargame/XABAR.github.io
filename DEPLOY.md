# Публикация сайта XABAR

Сайт статический, хостится бесплатно на **GitHub Pages** по адресу **https://xabargame.github.io/**. PDF one-pager пересобираются автоматически при каждом `git push` в `main` (`.github/workflows/deploy.yml`).

## 1. Организация и репозиторий
Адрес вида `<имя>.github.io` даёт только репозиторий с именем `<имя>.github.io` у аккаунта или организации `<имя>`.
1. Создать бесплатную организацию: **аватар → Your organizations → New organization → Free**, имя `xabargame`.
2. Перенести репозиторий в организацию: **Settings репозитория → General → Danger Zone → Transfer ownership** → владелец `xabargame`.
3. Переименовать репозиторий в `xabargame.github.io` (**Settings → General → Repository name**). Тип — **Public**.
4. Обновить адрес удалённого репозитория локально:
   ```bash
   git remote set-url origin https://github.com/xabargame/xabargame.github.io.git
   ```
5. Чтобы участники не были видны на странице организации: **People** → у своего аккаунта **Private** (видимость членства).

## 2. Публикация
1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. `git add . && git commit -m "Сайт XABAR" && git push`.
3. Вкладка **Actions**: дождаться зелёной галочки у «Deploy site». Сайт откроется по адресу https://xabargame.github.io/.

## 3. Свой домен (по желанию)
1. Купить домен (например, у REG.RU или RU-CENTER).
2. Подтвердить домен для организации: **Settings организации → Pages → Add a domain**, добавить выданную TXT-запись в DNS, нажать **Verify**.
3. В DNS добавить A-записи `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` и CNAME `www` → `xabargame.github.io.`
4. **Settings репозитория → Pages → Custom domain** → ввести домен → **Save**, после проверки включить **Enforce HTTPS**.
5. Указать новый адрес в `data/content.js` → `shared.site` и в `index.html` (`og:image`).

## Обновление контента
1. Отредактировать `data/content.js` (тексты сайта и one-pager — там же). Скриншоты — в `assets/img/shots/`, путь добавить в `shared.shots`.
2. Проверить локально: открыть `index.html` или `npm run serve`; пересобрать PDF — `npm run pdf`.
3. `git add . && git commit -m "…" && git push` — сайт и PDF обновятся автоматически.
