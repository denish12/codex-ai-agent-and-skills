import os
import re

ru_dir = r"e:\Light-Tech\Web\codex-ai-agents-and-skills\.agents\skills"
en_dir = r"e:\Light-Tech\Web\codex-ai-agents-and-skills\locales\en\.agents\skills"

ru_skills = [d for d in os.listdir(ru_dir) if os.path.isdir(os.path.join(ru_dir, d))]

missing = []
needs_translation = []
translated = []

cyrillic_pattern = re.compile(r'[А-Яа-яЁё]')

for skill in ru_skills:
    ru_path = os.path.join(ru_dir, skill, "SKILL.md")
    en_path = os.path.join(en_dir, skill, "SKILL.md")
    
    if not os.path.exists(en_path):
        missing.append(skill)
        continue
        
    try:
        with open(ru_path, 'r', encoding='utf-8') as f:
            ru_content = f.read()
    except Exception as e:
        ru_content = ""
        
    try:
        with open(en_path, 'r', encoding='utf-8') as f:
            en_content = f.read()
    except Exception as e:
        missing.append(skill)
        continue
        
    # Check if English file contains Cyrillic strongly
    cyrillic_chars = len(cyrillic_pattern.findall(en_content))
    
    if cyrillic_chars > 50 or en_content == ru_content:
        needs_translation.append(skill)
    else:
        translated.append(skill)

print(f"Total skills in RU: {len(ru_skills)}")
print(f"Missing from EN: {len(missing)}")
for m in missing:
    print(f"  - {m}")
print(f"Needs translation (contains Cyrillic or identical): {len(needs_translation)}")
for n in needs_translation:
    print(f"  - {n}")
print(f"Already translated: {len(translated)}")
