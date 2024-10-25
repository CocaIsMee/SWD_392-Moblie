// import React from 'react';
// import { View, Text, Dimensions } from 'react-native';
// import Carousel from 'react-native-snap-carousel';

// // Example data for the Carousel
// const data = [
//     { title: 'Item 1' },
//     { title: 'Item 2' },
//     { title: 'Item 3' },
// ];

// // Screen width for the Carousel
// const screenWidth = Dimensions.get('window').width;

// const MyCarousel: React.FC = () => {
//     // Render item for each element in the data array
//     const renderItem = ({ item }: { item: { title: string } }) => {
//         return (
//             <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8 }}>
//                 <Text style={{ fontSize: 18 }}>{item.title}</Text>
//             </View>
//         );
//     };

//     return (
//         <Carousel
//             data={data} // Required: Array of items to display in the Carousel
//             renderItem={renderItem} // Required: Function that renders each item
//             sliderWidth={screenWidth} // Width of the entire carousel component
//             itemWidth={screenWidth * 0.8} // Width of each individual item
//         />
//     );
// };

// export default MyCarousel;
