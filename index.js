class Stack {
    constructor() {
        this.top = null;
    }

    peek() {
        return this.top.data;
    }

    isEmpty() {
        if (this.top === null) {
            return true
        }
        return false;
    }

    remove(itemToRemove) {
        if (this.top === null) {
            return true
        }

        let node = this.top;

        if (this.top.data === itemToRemove) {
            this.top = node.next;
            return;
        }

        let previousNode;

        while (node !== null) {
            if (node.data === itemToRemove) {
                previousNode.next = node.next;
                return;
            }
            previousNode = node;
            node = node.next;
        }
    }

    display() {
        if (this.top === null) {
            return;
        }

        let node = this.top;

        while (node !== null) {
            console.log(node.data)
            node = node.next;
        }
    }

    push(data) {
        /* If the stack is empty, then the node will be the
           top of the stack */
        if (this.top === null) {
            this.top = new _Node(data, null);
            return this.top;
        }

        /* If the stack already has something, 
           then create a new node,
           add data to the new node, and
           have the pointer point to the top */
        const node = new _Node(data, this.top);
        this.top = node;
    }

    pop() {
        /* In order to remove the top of the stack, you have to point
           the pointer to the next item and that next item becomes the
           top of the stack */
        const node = this.top;
        this.top = node.next;
        return node.data;
    }
}

class _Node {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}

//Queue

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(data) {
        const node = new _NodeQ(data);

        if (this.first === null) {
            this.first = node;
        }

        if (this.last) {
            this.last.next = node;
        }
        //make the new node the last item on the queue
        this.last = node;
    }

    dequeue() {
        //if the queue is empty, there is nothing to return
       if (this.first === null) {
           return;
       }
       const node = this.first;
       this.first = this.first.next;
        //if this is the last item in the queue
       if (node === this.last) {
           this.last = null;
       }
       return node.value;
   }

   queueLength() {
       let length = 0;
       let node = this.first;

       while (node) {
           length++;
           node = node.next;
       }

       return length;
   }
}

class _NodeQ {
    constructor(value) {
        this.value=value;
        this.next=null;
    }
}

class DoubleLinkedQueue {
    constructor() {
        this.first = null,
        this.last = null;
    }

    enqueue(data) {
        const node = new _DoubleQNode(data);

        if (this.first === null) {
            this.first = node;
        }

        if (this.last) {
            node.previous = this.last
            this.last.next = node;
        }
        //make the new node the last item on the queue
        this.last = node;
    }

    dequeue() {
        //if the queue is empty, there is nothing to return
       if (this.first === null) {
           return;
       }
       const node = this.first;
       this.first = this.first.next;
        //if this is the last item in the queue
       if (node === this.last) {
           this.last = null;
       }
       return node.value;
   }

   getPrevious(searchValue) {
       let node = this.first;

       while (node) {
           if (node.value === searchValue) {
               return node.previous.value
           }
           node = node.next;
       }
       return 'Not found';
   }
}

class _DoubleQNode {
    constructor(value) {
        this.value = value,
        this.next = null,
        this.previous = null;
    }
}

const createAndSeedNewStack = function(initialItems) {
    const stackName = new Stack();
    initialItems.forEach(element => {
        stackName.push(element)
    });

    return stackName;
}

function is_palindrome(s) {
    s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

    const palStack = new Stack;
    
    for (let i=0; i<s.length; i++) {
        palStack.push(s.charAt(i))
    }
    let checkLetter;
    for (let i=0; i<s.length; i++) {
        checkLetter = palStack.pop()
        if (checkLetter !== s.charAt(i)) {
            return false;
        }
    }
    return true;
}

function matchingParentheses(string) {

    const matchStack = new Stack();

    const combos = {
        '(': ')',
        '[': ']',
        '{': '}'
    }

    for (let i=0; i<string.length; i++) {
        if (string[i] === '(' || string[i] === '[' || string[i] === '{') {
            matchStack.push(string[i]);
        }
        else {
            if (matchStack.isEmpty()) {
                return `Too many ${string[i]}`;
            }
            let last = matchStack.pop();

            if (string[i] !== combos[last]) {
                return `Problem with ${string[i]} at index ${i}`
            }
        }
    }
    if(!matchStack.isEmpty()) {
        return `There is an extra ${matchStack.pop()}`
    }
    return true;
}

function sortStack(stack) {
    const tempStack = new Stack();
 
    while (stack.top !== null) {
        let temp = stack.pop();

        while (tempStack.top && tempStack.top.data > temp) {
            stack.push(tempStack.pop());
        }
        tempStack.push(temp);
    }
    while (tempStack.top) {
        stack.push(tempStack.pop())
    }
}

const starTrek = createAndSeedNewStack(['Kirk', 'Spock', 'McCoy','Scotty']);
const sortedStack = createAndSeedNewStack([3, 6, 20,1]);

console.log(starTrek.peek());
console.log(starTrek.isEmpty());
starTrek.display();
starTrek.remove('McCoy');
starTrek.display();

console.log(is_palindrome("dad"));
console.log(is_palindrome("A man, a plan, a canal: Panama"));
console.log(is_palindrome("1001"));
console.log(is_palindrome("Tauhida"));

console.log(matchingParentheses('(())([])'));

sortedStack.display()

sortStack(sortedStack);

sortedStack.display()

//queue

function qPeek(queue) {
    console.log(queue.first)
}

function qIsEmpty(queue) {
    if (queue.first === null) {
        return true;
    }
    return false;
}

function qDisplay(queue) {
    let node = queue.first;
    while (node) {
        console.log(node)
        node = node.next;
    }
}

const trekQueue = new Queue;

trekQueue.enqueue('Kirk')
trekQueue.enqueue('Spock')
trekQueue.enqueue('Uhura')
trekQueue.enqueue('Sulu')
trekQueue.enqueue('Checkov')

qPeek(trekQueue)

// qDisplay(trekQueue)

const doubleLinked = new DoubleLinkedQueue();

doubleLinked.enqueue('Kirk')
doubleLinked.enqueue('Spock')
doubleLinked.enqueue('Uhura')
doubleLinked.enqueue('Sulu')
doubleLinked.enqueue('Checkov')

qDisplay(doubleLinked)

console.log(doubleLinked.getPrevious('Sulu'));

function ophilianBank(minutes, minutesPerCustomer=2, newCustomerComesEvery=3, lineStartsWith=10) {
    const line = new Queue();

    let totalMin = 0;

    //add orginial line
    for(let i=0; i<= lineStartsWith; i++) {
        line.enqueue(i)
    }

    while (!qIsEmpty(line) && totalMin < minutes) {
        totalMin++

        //should new customer be added
        if(totalMin % newCustomerComesEvery === 0) {
            lineStartsWith++;
            line.enqueue(lineStartsWith);
        }

        if (totalMin % minutesPerCustomer === 0) {
            let paperWorkProbability = Math.floor(Math.random() * 4)+1;
            if (paperWorkProbability > 1) {
                line.dequeue()
            }
            else {
                let disgrunteledCustomer = line.dequeue();
                line.enqueue(disgrunteledCustomer);
            }
        }
    }
    const summary = {'Total Minutues': minutes, 'Total Customers': lineStartsWith, 'Length of Current Line': line.queueLength()}

    console.log(summary);
}

ophilianBank(60, 3, 3, 0);
