import json
import argparse

red_total_reward = 0
true_total_reward = 0

def parse(data):
    nested_dicts = {}
    red_list = []
    true_list = []

    action_rewards = {}
    red_ar = []
    true_ar = []

    counter = False
    global red_total_reward, true_total_reward
    for item in data:
        if len(item) == 1:
            if not counter:
                red_ar.append(item[0])
                counter = not counter
            else:
                red_step_reward = item[0]['Red']
                red_total_reward += red_step_reward
                red_ar.append("(" + str(round(red_step_reward, 2)) + "/" + str(round(red_total_reward, 2)) + ")")
                true_step_reward = item[0]['Blue']
                true_total_reward += true_step_reward
                true_ar.append("(" + str(round(true_step_reward, 2)) + "/" + str(round(true_total_reward, 2)) + ")")

        if isinstance(item, dict):
            if 'Access' in item:
                if item['Scanned'] is True and item['Access'] == 'None':
                    item['Access'] = 'Scanned'
                    del item['Scanned']
                else:
                    del item['Scanned']
            red_list.append(item)
        
        elif isinstance(item, list):
            for i in item:
                if isinstance(i, list):
                    if len(i) == 1:
                        true_ar.append(i[0])
                if isinstance(i, dict):
                    if 'Access' in i:
                        if i['Scanned'] is True and i['Access'] == 'None':
                            i['Access'] = 'Scanned'
                            del i['Scanned']
                        else:
                            del i['Scanned']
                        true_list.append(i)
    
    # action_rewards["red"] = red_ar
    # action_rewards["true"] = true_ar
    nested_dicts["red_ar"] = red_ar
    nested_dicts["true_ar"] = true_ar
    nested_dicts["red"] = red_list
    nested_dicts["true"] = true_list

    # for i in nested_dicts:
    #     action_reward_dict = {nested_dicts[i][0]: nested_dicts[i][-1]}
    #     del nested_dicts[i][0]
    #     del nested_dicts[i][-1]
    #     nested_dicts[i].append(action_reward_dict)
    
    return nested_dicts

def write(input, output):

    with open(input, 'r') as input_file:
        nested_dicts = []
        for line in input_file:
            json_data = json.loads(line)
            nested_dicts.append(parse(json_data))

    with open(output, 'w') as output_file:
        json.dump(nested_dicts, output_file, indent=2)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Choose files to ')
    parser.add_argument('--input', default='game.json')
    parser.add_argument('--output', default='output.json', help='Rename the output file, defaults to \"output.json\".')
    args = parser.parse_args()

    write(args.input, args.output)