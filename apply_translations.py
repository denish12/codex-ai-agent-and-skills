import os
import glob
import json


base_dir = "E:/Light-Tech/Web/codex-ai-agents-and-skills/domains/analytics/locales/en/.agents/skills"
translations_file = "E:/Light-Tech/Web/codex-ai-agents-and-skills/translations_done.json"

with open(translations_file, 'r', encoding='utf-8') as f:
    translations = json.load(f)

for skill_name, trans_data in translations.items():
    skill_agents_dir = os.path.join(base_dir, skill_name, 'agents')
    if not os.path.exists(skill_agents_dir):
        continue
        
    for file_path in glob.glob(os.path.join(skill_agents_dir, '*.*')):
        if file_path.endswith('.json'):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = json.load(f)
                
            content['display_name'] = trans_data['display_name']
            content['description'] = trans_data['description']
            if 'default_prompt' in content:
                content['default_prompt'] = trans_data['default_prompt']
            
            # Keep ascii triggers (English), completely replace non-ascii (Russian) with the new translated English ones
            triggers = content.get('triggers', [])
            ascii_triggers = [t for t in triggers if all(ord(c) < 128 for c in t)]
            new_triggers = ascii_triggers + trans_data['triggers']
            # Dedup and preserve order roughly
            seen = set()
            new_triggers_dedup = [x for x in new_triggers if not (x in seen or seen.add(x))]
            content['triggers'] = new_triggers_dedup
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(content, f, ensure_ascii=False, indent=2)
                
        elif file_path.endswith('.yaml') or file_path.endswith('.yml'):
            # Manual replacement for YAML since yaml dump ruins formatting and ordered dicts sometimes
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                
            out_lines = []
            in_triggers = False
            for line in lines:
                if line.strip().startswith('display_name:'):
                    indent = line[:len(line) - len(line.lstrip())]
                    out_lines.append(f'{indent}display_name: "{trans_data["display_name"]}"\n')
                elif line.strip().startswith('description:'):
                    indent = line[:len(line) - len(line.lstrip())]
                    desc = trans_data["description"].replace("\"", "\\\"")
                    out_lines.append(f'{indent}description: "{desc}"\n')
                elif line.strip().startswith('short_description:'):
                    indent = line[:len(line) - len(line.lstrip())]
                    desc = trans_data["description"].replace("\"", "\\\"")
                    out_lines.append(f'{indent}short_description: "{desc}"\n')
                elif line.strip().startswith('default_prompt:'):
                    indent = line[:len(line) - len(line.lstrip())]
                    pmt = trans_data["default_prompt"].replace("\"", "\\\"")
                    out_lines.append(f'{indent}default_prompt: "{pmt}"\n')
                elif line.strip().startswith('triggers:'):
                    out_lines.append(line)
                    in_triggers = True
                    # generate triggers
                    for t in trans_data['triggers']:
                        out_lines.append(f'  - "{t}"\n')
                elif in_triggers:
                    if line.startswith('  -'):
                        # Keep ascii ones only
                        trigger_val = line.split('"')[1] if '"' in line else line.strip().split('- ')[1]
                        if all(ord(c) < 128 for c in trigger_val):
                            out_lines.append(line)
                    else:
                        in_triggers = False
                        out_lines.append(line)
                else:
                    out_lines.append(line)
                    
            with open(file_path, 'w', encoding='utf-8') as f:
                f.writelines(out_lines)

print('Update complete')
