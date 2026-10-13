#!/bin/bash
# Деплой статики ХКООП на GitHub Pages (u4100354-gif.github.io — корневой репозиторий/gh-pages ветка).
# Использование: bash /tmp/deploy.sh   (перед этим: STATIC_EXPORT=1 npm run build, индекс поиска, .nojekyll)
set -euo pipefail
cd ~/сайт
[ -f .next-export/index.html ] || { echo "Нет экспорта: STATIC_EXPORT=1 npm run build"; exit 1; }
touch .next-export/.nojekyll

# gh-pages WORKTREE, ветка gh-pages должна быть уже создана один раз (git worktree add ~/сайт/.claude/worktrees/gh-pages gh-pages)
WT=~/сайт/.claude/worktrees/gh-pages
[ -d "$WT" ] || git worktree add "$WT" gh-pages

cd "$WT"
rsync -a --delete --exclude=.git ~/сайт/.next-export/ ./   # при первом запуске через rsync нет — cp -R
cd ~/сайт
git -C "$WT" add -A
git -C "$WT" commit -qm "Pages: обновление статики $(date +%Y-%m-%d)"
git -C "$WT" push origin gh-pages
echo "Готово. Проверка: https://u4100354-gif.github.io/"
