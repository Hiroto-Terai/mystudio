#!/bin/bash
# Block direct git operations that would affect the main branch.

INPUT=$(cat)
COMMAND=$(python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('tool_input', {}).get('command', ''))
except:
    print('')
" <<< "$INPUT" 2>/dev/null)

block() {
  printf '{"decision":"block","reason":"%s"}' "$1"
  exit 2
}

# Block: git push ... main
if echo "$COMMAND" | grep -qE '\bgit\b.*\bpush\b.*\bmain\b'; then
  block "main への直接 push は禁止です。feature ブランチから PR を作成してください。"
fi

# Block: git checkout main / git switch main
if echo "$COMMAND" | grep -qE '\bgit\b.*(checkout|switch)\s+(--\s+)?main\b'; then
  block "main への直接 checkout は禁止です。feature ブランチを使用してください。"
fi

# Block: git merge <anything> when the word "main" appears as target context
# (e.g. merging a feature branch into main by first being on main)
# Simpler guard: block git merge when explicitly mentioning main
if echo "$COMMAND" | grep -qE '\bgit\b.*\bmerge\b.*\bmain\b'; then
  block "main への直接 merge は禁止です。PR を通じてマージしてください。"
fi

exit 0
