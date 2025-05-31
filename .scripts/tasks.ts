import { execSync } from 'node:child_process';
import readline from 'node:readline';

type Task = {
    item: number;
    description: string;
    name?: string;
    exec: string;
};

export const TASKS: Task[] = [
    {
        item: 1,
        description: '(Local) Run the @bspk/ui meta generation script',
        name: 'runMetaLocally',
        exec: 'npx tsx ./.scripts/tasks/runMetaLocally.ts',
    },
    {
        item: 2,
        description: 'Report missing CSS variables',
        name: 'reportMissingVariables',
        exec: 'npx tsx ./.scripts/tasks/reportMissingVariables.ts',
    },
    {
        item: 3,
        description: 'Ensure latest version of @bspk/ui is installed',
        name: 'ensureLatestUIVersion',
        exec: 'npx tsx ./.scripts/tasks/ensureLatestUIVersion.ts run',
    },
    {
        item: 4,
        description: 'Run the @bspk/ui meta generation script',
        exec: 'npm run meta',
    },
    {
        item: 5,
        description: 'Update the @bspk/ui package to the latest version / run css vars checker',
        name: 'updateUI',
        exec: 'npm unlink @bspk/ui && npm un @bspk/ui && npm i @bspk/ui && npx tsx ./.scripts/tasks/reportMissingVariables.ts',
    },
] as const;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('SIGINT', function () {
    rl?.close();
    process.exit();
});

// Call runMenu again to allow for another selection
rl?.on('close', () => {
    console.log('Exiting...');
    process.exit(0);
});

// a node cli script that displays a menu, waits for an input of an item number, then runs the callback, allow the menu to be skipped if an argument is passed, after the callback is run, the menu is displayed again, until the user selects exit
async function runMenu(looped = false) {
    const args = process.argv.slice(2);

    let task: Task | undefined;
    const hasArgument = args.length > 0;

    if (!looped && hasArgument) {
        const selectedItem = parseInt(args[0], 10);
        task = TASKS.find(({ item }) => item === selectedItem);
    }

    if (!task) {
        console.log(
            looped
                ? '\n\nSelect another option or press Ctrl+C to exit.'
                : '\n\n⚡️\n\nSelect an option or press Ctrl+C to exit.',
        );

        TASKS.forEach(({ item, description }) => {
            console.log(`\n${item}. ${description}`);
        });

        task = await new Promise((resolve) => {
            rl.question('\nEnter the number of the option you want to run: ', (answer) => {
                const selectedItem = parseInt(answer, 10);
                const taskChoice = TASKS.find(({ item }) => item === selectedItem);

                if (taskChoice) resolve(taskChoice);

                console.log('Invalid selection.');
            });
        });
    }

    if (task) {
        console.log(`\n\nRunning ${task.name}...\n\n`);
        execSync(task.exec, { stdio: 'inherit' });
        console.log('\n\nComplete!\n\n');
        runMenu(true);
        return;
    } else {
        console.log('\n\nInvalid selection.');
        if (!hasArgument) runMenu(true);
        return;
    }

    // Call runMenu again to allow for another selection
}

runMenu();
