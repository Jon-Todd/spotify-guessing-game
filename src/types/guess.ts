export interface GuessType {
    name: string;
    debut: number;
    members: number;
    popularity: number;
    gender: 'male' | 'female' | 'mixed';
    genre: string;
    nationality: string;
}