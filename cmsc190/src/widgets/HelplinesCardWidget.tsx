import { theme } from 'core';
import { memo } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';

const HelplinesCardWidget = () => {
  const dialNumber = (number: string): void => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <Card>
      <Text style={styles.header}>HELPLINES</Text>
      <View style={styles.group}>
        <Text style={styles.title}>
          National Center for Mental Health Crisis Hotline
        </Text>
        <Text style={styles.subtitle}>
          A 24/7 crisis hotline to assist people with mental health disorder
          through counseling, psychiatric emergencies and suicide prevention.
        </Text>
        <View style={styles.phoneNumberGroup}>
          <Text style={styles.phoneNumber} onPress={() => dialNumber('1553')}>
            1553 (Toll-free)
          </Text>
          <Text>, </Text>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('09663514518')}>
            0966 351 4518
          </Text>
          <Text>, </Text>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('09178998727')}>
            0917 899 8727
          </Text>
          <Text>, </Text>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('09086392672')}>
            0908 639 2672
          </Text>
        </View>
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>In Touch Community Services</Text>
        <Text style={styles.subtitle}>
          Offers 24/7 free and confidential support.
        </Text>
        <View style={styles.phoneNumberGroup}>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('(02)88931893')}>
            (02) 8893 1893
          </Text>
          <Text>, </Text>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('09178001123')}>
            0917 800 1123
          </Text>
          <Text>, </Text>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('09228938944')}>
            0922 893 8944
          </Text>
        </View>
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>Hopeline, Natasha Goulbourn Foundation</Text>
        <Text style={styles.subtitle}>
          A depression and suicide prevention hotline to help people who are
          secretly suffering from it.
        </Text>
        <View style={styles.phoneNumberGroup}>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('(02)88044673')}>
            (02) 8804 4673
          </Text>
          <Text>, </Text>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('09175584673')}>
            0917 558 4673
          </Text>
          <Text>, </Text>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('09276541629')}>
            0927 654 1629
          </Text>
        </View>
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>Manila Lifeline Center</Text>
        <Text style={styles.subtitle}>
          Offers tele-counseling that focuses on suicide.
        </Text>
        <View style={styles.phoneNumberGroup}>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('(02)8969191')}>
            (02) 896 9191
          </Text>
          <Text>, </Text>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('09178549191')}>
            0917 854 9191
          </Text>
        </View>
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>Tawag Paglaum Centro Bisaya</Text>
        <Text style={styles.subtitle}>
          A 24/7 call-based hotline for suicide prevention and emotional crisis
          intervention based in Cebu City.
        </Text>
        <View style={styles.phoneNumberGroup}>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('09399365433')}>
            0939 936 5433
          </Text>
          <Text>, </Text>
          <Text
            style={styles.phoneNumber}
            onPress={() => dialNumber('09276541629')}>
            0927 654 1629
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    color: theme.colors.onSurface,
    fontSize: theme.fonts.labelLarge.fontSize,
    fontFamily: theme.fonts.labelLarge.fontFamily,
    borderBottomColor: theme.colors.outline,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 8,
  },
  group: {
    marginTop: 10,
  },
  title: {
    color: theme.colors.onSurface,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
    fontSize: theme.fonts.bodySmall.fontSize,
    fontFamily: theme.fonts.bodySmall.fontFamily,
    marginBottom: 2,
  },
  phoneNumberGroup: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 2,
  },
  phoneNumber: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
});

export default memo(HelplinesCardWidget);
