export interface pokemon {
    id: number;
    is_default: boolean;
    name: string;
    height: number;
    weight: number;
    order: number;
    base_experience: number;

    abilities: abilitiy[];
    forms: link[];
    game_indices: game_index[];
    held_items: held_item[];
    moves: move[];

    species: link;
    sprites: spirtes;
    stats: stat[];
    types: type[];

    location_area_encounters: string;
};

interface abilitiy {
    ability: link;
    is_hidden: boolean;
    slot: number;
};

interface game_index {
    game_index: number;
    version: link
};

interface held_item {
    item :link;
    version_details : version_detail[];
}

interface version_detail {
    rarity : number;
    version : link;
}

interface move {
    move: link;
    version_group_details: version_group_detail[];
};

interface version_group_detail {
    version_group_detail: number;
    version_group : link;
    move_learn_method : link;
}

interface spirtes {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
}

interface stat {
    stat: link;
    effort: number;
    base_stat: number;
}

interface type {
    slot: number;
    type: link;
}

interface link {
    name: string;
    url: string;
};