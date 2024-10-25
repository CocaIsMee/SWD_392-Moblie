import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { Video, ResizeMode } from 'expo-av';
import Modal from 'react-native-modal';

interface FilterItem {
    id: string;
    name: string;
}

const AITool: React.FC = () => {
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterItem[]>([]);
    const [chapters, setChapters] = useState<FilterItem[]>([]);
    const [topics, setTopics] = useState<FilterItem[]>([]);
    const [problemTypes, setProblemTypes] = useState<FilterItem[]>([]);
    const [chapterLoading, setChapterLoading] = useState<boolean>(false);
    const [topicLoading, setTopicLoading] = useState<boolean>(false);
    const [problemTypeLoading, setProblemTypeLoading] = useState<boolean>(false);
    const [chapterError, setChapterError] = useState<string | null>(null);
    const [topicError, setTopicError] = useState<string | null>(null);
    const [problemTypeError, setProblemTypeError] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);  // Modal state

    // Fetch subjects and handle errors
    const fetchSubjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const id = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');

            if (!id) {
                console.log('User ID not found in AsyncStorage');
                setError('User ID not found. Please log in again.');
                return;
            }

            const response = await fetch(`https://mindmath.azurewebsites.net/api/subjects/active`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFilters(data.map((item: any) => ({ id: item.id, name: item.name })));
        } catch (error) {
            console.error("Failed to fetch subjects:", error);
            setError('Failed to fetch subjects. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch chapters for a given subject ID and handle errors
    const fetchChapters = async (subjectId: string) => {
        setChapterLoading(true);
        setChapterError(null);

        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = await fetch(`https://mindmath.azurewebsites.net/api/subjects/${subjectId}/chapters/active`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setChapters(data.map((item: any) => ({ id: item.id, name: item.name })));
        } catch (error) {
            console.error("Failed to fetch chapters:", error);
            setChapterError('Failed to fetch chapters. Please try again later.');
        } finally {
            setChapterLoading(false);
        }
    };

    // Fetch topics for a given chapter ID and handle errors
    const fetchTopics = async (chapterId: string) => {
        setTopicLoading(true);
        setTopicError(null);

        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = await fetch(`https://mindmath.azurewebsites.net/api/chapters/${chapterId}/topics/active`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTopics(data.map((item: any) => ({ id: item.id, name: item.name })));
        } catch (error) {
            console.error("Failed to fetch topics:", error);
            setTopicError('Failed to fetch topics. Please try again later.');
        } finally {
            setTopicLoading(false);
        }
    };

    // Fetch problem types for a given topic ID and handle errors
    const fetchProblemTypes = async (topicId: string) => {
        setProblemTypeLoading(true);
        setProblemTypeError(null);

        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = await fetch(`https://mindmath.azurewebsites.net/api/topics/${topicId}/problem-types/active`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProblemTypes(data.map((item: any) => ({ id: item.id, name: item.name })));
        } catch (error) {
            console.error("Failed to fetch problem types:", error);
            setProblemTypeError('Failed to fetch problem types. Please try again later.');
        } finally {
            setProblemTypeLoading(false);
        }
    };

    // Handle subject selection and trigger chapter fetching
    const handleSubjectChange = (subjectId: string) => {
        setSelectedSubject(subjectId);
        fetchChapters(subjectId);  // Fetch chapters for the selected subject
        setSelectedChapter(null);  // Reset the selected chapter when subject changes
        setTopics([]);  // Clear topics when subject changes
        setProblemTypes([]);  // Clear problem types when subject changes
    };

    // Handle chapter selection and trigger topic fetching
    const handleChapterChange = (chapterId: string) => {
        setSelectedChapter(chapterId);
        fetchTopics(chapterId);  // Fetch topics for the selected chapter
        setSelectedTopic(null);  // Reset the selected topic when chapter changes
        setProblemTypes([]);  // Clear problem types when chapter changes
    };

    // Handle topic selection and trigger problem type fetching
    const handleTopicChange = (topicId: string) => {
        setSelectedTopic(topicId);
        fetchProblemTypes(topicId);  // Fetch problem types for the selected topic
    };

    // Fetch subjects when the component mounts
    useEffect(() => {
        fetchSubjects();
    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);  // Toggle modal visibility
    };

    // Placeholder function for when the video is generated
    const handleGenerateVideo = async () => {
        setLoading(true);
        try {
            // Simulate video generation process
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace with actual video generation logic

            // Open the modal with the video player
            toggleModal();
        } catch (error) {
            console.error("Error generating video:", error);
        } finally {
            setLoading(false);
        }
    };

    // UI Rendering
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2196F3" />
                <Text>Loading subjects...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Math Solver AI</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Input your problem..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    onSubmitEditing={() => console.log('Search query:', searchQuery)}
                />
            </View>
            <Text style={styles.label}>Select Subject:</Text>
            <RNPickerSelect
                onValueChange={(value) => handleSubjectChange(value)}
                items={filters.map((filter) => ({ label: filter.name, value: filter.id }))}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select a subject', value: null }}
                value={selectedSubject}
            />

            {selectedSubject && (
                <View>
                    <Text style={styles.label}>Select Chapter:</Text>
                    {chapterLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#2196F3" />
                            <Text>Loading chapters...</Text>
                        </View>
                    ) : chapterError ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{chapterError}</Text>
                        </View>
                    ) : (
                        <RNPickerSelect
                            onValueChange={(value) => handleChapterChange(value)}
                            items={chapters.map((chapter) => ({ label: chapter.name, value: chapter.id }))}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select a chapter', value: null }}
                            value={selectedChapter}
                        />
                    )}
                </View>
            )}

            {selectedChapter && (
                <View>
                    <Text style={styles.label}>Select Topic:</Text>
                    {topicLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#2196F3" />
                            <Text>Loading topics...</Text>
                        </View>
                    ) : topicError ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{topicError}</Text>
                        </View>
                    ) : (
                        <RNPickerSelect
                            onValueChange={(value) => handleTopicChange(value)}
                            items={topics.map((topic) => ({ label: topic.name, value: topic.id }))}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select a topic', value: null }}
                            value={selectedTopic}
                        />
                    )}
                </View>
            )}

            {selectedTopic && (
                <View>
                    <Text style={styles.label}>Select Problem Type:</Text>
                    {problemTypeLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#2196F3" />
                            <Text>Loading problem types...</Text>
                        </View>
                    ) : problemTypeError ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{problemTypeError}</Text>
                        </View>
                    ) : (
                        <RNPickerSelect
                            onValueChange={(value) => console.log('Problem type selected:', value)}
                            items={problemTypes.map((problemType) => ({ label: problemType.name, value: problemType.id }))}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select a problem type', value: null }}
                        />
                    )}
                </View>
            )}

            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.generateButton}
                    onPress={handleGenerateVideo}
                    disabled={loading}
                >
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#fff" />
                            <Text style={styles.generateButtonText}>Generating...</Text>
                        </View>
                    ) : (
                        <Text style={styles.generateButtonText}>Generate Video</Text>
                    )}
                </TouchableOpacity>
            </View>
            {/* Modal for displaying the video */}
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <Video
                        source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode={ResizeMode.COVER}
                        shouldPlay
                        style={{ width: 300, height: 300 }}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    generateButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    generateButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoPlayer: {
        width: 300,
        height: 200,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#333',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#333',
        paddingRight: 30,
    },
});

export default AITool;
