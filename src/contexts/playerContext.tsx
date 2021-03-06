import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    play: (episode: Episode) => void;
    playNext: () => void;
    playPrevious: () => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPlayerSate: () => void;
    isPlaying: boolean;
    isShuffling: boolean;
    isLooping: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
};

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLoping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLoping(!isLooping)
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function clearPlayerSate() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = (currentEpisodeIndex < episodeList.length - 1) || isShuffling;

    function playNext() {
        if (hasNext) {
            const nextRandomEpIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpIndex);
        }
        else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }



    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    return (

        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            play,
            playList,
            playNext,
            playPrevious,
            isLooping,
            isPlaying,
            isShuffling,
            togglePlay,
            toggleShuffle,
            toggleLoop,
            setPlayingState,
            clearPlayerSate,
            hasNext,
            hasPrevious
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}