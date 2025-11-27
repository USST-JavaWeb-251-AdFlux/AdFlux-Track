export const display = (msg) => {
    const node = document.createElement('p');
    node.textContent = msg;
    document.body.append(node);
    console.log(msg);
};

export const getMeta = (name) => document.querySelector(`meta[name="${name}"]`).content;

export const newId = () => crypto.randomUUID();
