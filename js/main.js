"use strict";
let stdout;
let fg_color = 'white';
let bg_color = 'rgba(0, 0, 0, 0)';
class Command {
    constructor(exec_name, callback, descrption = '') {
        this.exec_name = exec_name;
        this.callback = callback;
        this.descrption = descrption;
    }
    run() {
        this.callback();
        print_prompt();
    }
}
;
function print_out(stream, str, fg = fg_color, bg = bg_color) {
    let node = document.createElement('pre');
    node.style.color = fg;
    node.style.backgroundColor = bg;
    node.textContent = str;
    stream.appendChild(node);
}
function print_ln(stream, str, fg = fg_color, bg = bg_color) {
    let splited_str = str.split('\n');
    for (let sp of splited_str) {
        let node = document.createElement('pre');
        node.style.color = fg;
        node.style.backgroundColor = bg;
        node.textContent = sp;
        stream.appendChild(node);
        stream.appendChild(document.createElement('br'));
    }
}
function print_si1kdd() {
    print_ln(stdout, 'Hello, I am \n\
     _ _         __  __               ____            _    \n\
    | (_)_ __   |  \\/  | __ _ _ __   |  _ \\ __ _ _ __| | __\n\
 _  | | |  _ \ | |  \\/| |/ _` |  _ \\  | |_) / _` |  __| |/ /\n\
| |_| | | | | | | |  | | (_| | | | | |  __/ (_| | |  |   < \n\
 \\___/|_|_| |_| |_|  |_|\\__,_|_| |_| |_|   \\__,_|_|  |_|\\_\\ \n');
}

function print_prompt() {
    print_out(stdout, 'jmpsh $ ', 'green');
}
function print_url(stream, href, fg = fg_color, bg = bg_color) {
    let node = document.createElement('a');
    node.style.color = fg;
    node.style.backgroundColor = bg;
    node.textContent = href;
    node.target = '_self';
    node.setAttribute('href', href);
    stream.appendChild(node);
}
function cmd_whoami() {
    print_ln(stdout, "Name: ", 'white');
    print_out(stdout, 'Jin Man, Park. Call me ');
    print_ln(stdout, 'Jin', 'red');
    print_ln(stdout, '');
    print_ln(stdout, 'About Me:\t', 'white');
    print_out(stdout, "I've been involved in two startups—one that I started myself and ", 'white');
    print_out(stdout, "another I started myself and another where I was one of the first", 'white');
    print_out(stdout, "members, working as a software developer. I've got experience", 'white');
    print_out(stdout, "in a few different areas like finance, autonomous driving, and", 'white');
    print_out(stdout, "remote education. I also have a range of technical skills,", 'white');
    print_out(stdout, "from optimizing data pipelines and designing scalable system", 'white');
    print_out(stdout, "architectures to handling DevOps (on-prem and in the cloud),", 'white');
    print_ln(stdout, "working with LLMs, and doing frontend development.", 'white');
    print_ln(stdout, '');
}

function cmd_linkedin() {
    print_out(stdout, 'My LinkedIn profile: ', 'yellow');
    print_out(stdout, '\nLinkedIn: ', 'red');
    print_out(stdout, '\t');
    print_url(stdout, "https://www.linkedin.com/in/skswlsaks/", 'white');
    print_ln(stdout, '');
}

function cmd_faq() {
    print_ln(stdout, 'Frequently Asked Questions', 'yellow');
    print_ln(stdout, '');
    print_ln(stdout, '1. Can you tell me about your most recent work experience?', 'grey');
    print_ln(stdout, 'Recent company was a Fin-tech company, building a product about Quant', 'white');
    print_ln(stdout, 'tool for Institutional Investors. It invloves lots of cutting-edge', 'white');
    print_ln(stdout, 'technologies, like distributed databases, optimizing large dataset calculation', 'white');
    print_ln(stdout, 'and high-available services based on on-prem and cloud infrastructures.', 'white');
    print_ln(stdout, '');
    print_ln(stdout, '2. What do you enjoy doing outside of work?', 'grey');
    print_ln(stdout, 'I\'m a whisky🥃 connoisseur and a coffee☕️ enthusiast. I love exploring new whisky', 'white');
    print_ln(stdout, 'bottles and discovering cafés around Seoul.', 'white');
    print_ln(stdout, 'If you\'re interested, feel free to reach out!', 'white');
    print_ln(stdout, '');
    print_ln(stdout, '3. What motivated your transition from a Developer to a Solution Architect?', 'grey');
    print_ln(stdout, 'Although I don\'t have direct experience as a Solution Architect at the moment,', 'white');
    print_ln(stdout, 'I believe there are numerous opportunities to add value for customers in this role.', 'white');
    print_ln(stdout, 'I am passionate about creating value within a business, which is why I\'ve', 'white');
    print_ln(stdout, 'consistently been involved in startups throughout my career. Additionally,', 'white');
    print_ln(stdout, 'the chance to collaborate with and learn from talented people in this field', 'white');
    print_ln(stdout, 'excites me even more about the role.', 'white');

    print_ln(stdout, '');
}

function cmd_resume() {
    print_out(stdout, 'My Resume: ', 'yellow');
    print_out(stdout, '\nResume: ', 'red');
    print_out(stdout, '\t');
    print_url(stdout, "https://skswlsaks.github.io/Resume-Jin%20Man%20Park.pdf", 'white');
    print_ln(stdout, '');
}

function cmd_help(shell) {
    print_ln(stdout, 'Jmp shell (v1.31) all commands:', 'red');
    for (let i = 0; i < shell.bin.length; i++) {
        let cmds = shell.bin[i];
        print_ln(stdout, cmds.exec_name + '\t - ' + cmds.descrption, 'yellow');
    }
}
function select_last(editable_element) {
    let range = document.createRange();
    let select = window.getSelection();
    range.selectNodeContents(editable_element);
    range.collapse(false);
    select.removeAllRanges();
    select.addRange(range);
}
class Shell {
    constructor() {
        this.bin = [];
        this.history = [];
        this.curr_line = 0;
    }
    init(cmds) {
        this.bin[this.bin.length] = cmds;
    }
    previous_cmds() {
        this.curr_line -= 1;
        if (this.curr_line < 0)
            this.curr_line = 0;
        return this.history[this.curr_line];
    }
    next_cmds() {
        this.curr_line += 1;
        if (this.curr_line >= this.history.length) {
            this.curr_line = this.history.length;
            return '';
        }
        else
            return this.history[this.curr_line];
    }
    appen_history(input) {
        let exec_name = input.trim();
        if (exec_name === '')
            return;
        else {
            this.history.push(input);
            this.curr_line = this.history.length;
        }
    }
    exec(input) {
        let exec_name = input.trim();
        if (exec_name === '') {
            print_prompt();
            return;
        }
        if (exec_name === 'init') {
            print_si1kdd();
            cmd_help(this);
            print_prompt();
            return;
        }
        if (exec_name === 'help') {
            cmd_help(this);
            print_prompt();
            return;
        }
        // supported commands
        let founded = false;
        for (let cmds of this.bin) {
            if (cmds.exec_name === exec_name) {
                founded = true;
                cmds.run();
                break;
            }
        }
        if (!founded) {
            print_ln(stdout, "jmpsh $ command not found: " + exec_name);
            print_prompt();
        }
    }
}
window.onload = () => {
    stdout = document.getElementById('stdout');
    let stdin = document.getElementById('stdin');
    let jmpsh = new Shell();
    jmpsh.init(new Command('icon', print_si1kdd, 'Print my icon.'));
    jmpsh.init(new Command('whoami', cmd_whoami, 'Display my personal profile.'));
    jmpsh.init(new Command('linkedi', cmd_linkedin, 'Display my LinkedIn profile.'));
    jmpsh.init(new Command('faq', cmd_faq, 'Frquently asked questions about me.'));
    jmpsh.init(new Command('resume', cmd_resume, 'Find out my latest Resume.'));
    jmpsh.init(new Command('help', cmd_help, 'Display all commands supported.'));
    document.getElementById('terminal').onclick = (e) => {
        stdin.focus();
    };
    stdin.onkeydown = (e) => {
        if (e.keyCode === 13) {
            let content = stdin.textContent;
            e.preventDefault();
            jmpsh.appen_history(content);
            print_ln(stdout, ' ' + content);
            jmpsh.exec(content);
            stdin.textContent = '';
            stdin.focus();
        }
        else if (e.keyCode === 38) {
            // up
            e.preventDefault();
            stdin.textContent = jmpsh.previous_cmds();
            select_last(stdin);
        }
        else if (e.keyCode === 40) {
            // down
            e.preventDefault();
            stdin.textContent = jmpsh.next_cmds();
            select_last(stdin);
        }
    };
    select_last(stdin);
    stdin.focus();
    jmpsh.exec('init');
};
