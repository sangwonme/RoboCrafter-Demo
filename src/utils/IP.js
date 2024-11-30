export const base = 'http://110.35.174.14:8080';

export const echo = (text, name) => {
  return base + `/echo?text=${text}&name=${name}`;
}

export const project_decompose = (text, name) => {
  return base + `/project-decompose?user_text=${text}&name=${name}`;
}

