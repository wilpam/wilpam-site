export type Person = {
  name: string;
  slug: string;
  pronouns: string;
  cardClass: string;
  site?: string;
  description: string;
};

export const people: Person[] = [
  {
    name: "Liv",
    slug: "liv",
    pronouns: "he/him",
    cardClass: "liv-card",
    description: "Liv is an aspiring author, occasional world-builder as well as self described “queer of the year”."
  },
  {
    name: "Digi",
    slug: "digi",
    pronouns: "he/him",
    cardClass: "digi-card",
    site: "https://digital.accorp.net/",
    description: "Digi is a programmer and designer of all things he can get his hands on."
  },
  {
    name: "Emerald",
    slug: "emerald",
    pronouns: "he/him",
    cardClass: "emerald-card",
    description: "Emerald: the Resident Chaos Entity"
  },
  {
    name: "Yoosure",
    slug: "yoosure",
    pronouns: "he/him",
    cardClass: "yoosure-card",
    description: "Yoosure is sometimes a musician but mostly a random kid at the function"
  },
  {
    name: "Legi",
    slug: "legi",
    pronouns: "he/him",
    cardClass: "legi-card",
    site: "https://legitsi.neocities.org",
    description: "Legi is the historian and one of the creative minds of the group."
  },
  {
    name: "Andrew",
    slug: "andrew",
    pronouns: "he/him",
    cardClass: "andrew-card",
    site: "https://andrewtheblueskier.bsky.social",
    description: "Andrew is a stereotypical all-purpose nerd as well as a nonpracticing worldbuilder and creative."
  },
  {
    name: "Whirl",
    slug: "whirl",
    pronouns: "he/him",
    cardClass: "whirl-card",
    site: "https://whirli.ng",
    description: "Whirl is a programmer <s>and professional stealer of ideas</s>"
  },
  {
    name: "Quin",
    slug: "quin",
    pronouns: "he/him",
    cardClass: "quin-card",
    description: ""
  },
  {
    name: "Mac",
    slug: "mac",
    pronouns: "any",
    cardClass: "mac-card",
    description: "Mac is a worldbuilder and aspiring aspirer."
  },
  {
    name: "Lucy",
    slug: "lucy",
    pronouns: "any",
    cardClass: "lucy-card",
    description: "Lucy is wawa and do wawa all over the place<br>\"also im a dumb fucking furry\" - Lucy"
  }
];

export function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function getPersonBySlug(slug: string) {
  return people.find((person) => person.slug === slugify(slug));
}

export function getPersonByName(name: string) {
  return people.find((person) => person.name.toLowerCase() === name.trim().toLowerCase());
}
