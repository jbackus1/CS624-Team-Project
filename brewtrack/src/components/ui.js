import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow, spacing, statusColors } from '../theme';

// Shared building blocks. Import what you need:
//   import { Card, PrimaryButton, StatusPill, EmptyState, FAB } from '../../components/ui';

export function Card({ children, style, onPress }) {
  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper onPress={onPress} style={[styles.card, style]}>
      {children}
    </Wrapper>
  );
}

export function PrimaryButton({ title, onPress, variant = 'primary', style, disabled }) {
  const bg =
    variant === 'danger' ? colors.danger : variant === 'secondary' ? colors.foam : colors.caramel;
  const fg = variant === 'secondary' ? colors.espresso : '#fff';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bg, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        variant === 'secondary' && { borderWidth: 1, borderColor: colors.border },
        style,
      ]}
    >
      <Text style={[styles.buttonText, { color: fg }]}>{title}</Text>
    </Pressable>
  );
}

export function StatusPill({ status }) {
  const c = statusColors[status] || statusColors.Completed;
  return (
    <View style={[styles.pill, { backgroundColor: c.bg }]}>
      <Text style={[styles.pillText, { color: c.fg }]}>{status}</Text>
    </View>
  );
}

export function EmptyState({ icon = 'cafe-outline', title, message }) {
  return (
    <View style={styles.empty}>
      <Ionicons name={icon} size={48} color={colors.textMuted} />
      <Text style={styles.emptyTitle}>{title}</Text>
      {message ? <Text style={styles.emptyMsg}>{message}</Text> : null}
    </View>
  );
}

// Floating "+" button, bottom-right of a screen.
export function FAB({ onPress, icon = 'add', label }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={label || 'Add'}
      style={({ pressed }) => [styles.fab, { opacity: pressed ? 0.85 : 1 }]}
    >
      <Ionicons name={icon} size={28} color="#fff" />
    </Pressable>
  );
}

export function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.caramel} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.foam,
    borderRadius: radius.md,
    padding: spacing.md,
    ...shadow,
  },
  button: {
    minHeight: 48, // comfortable touch target
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  buttonText: { fontSize: 16, fontWeight: '700' },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  pillText: { fontSize: 12, fontWeight: '700' },
  empty: { alignItems: 'center', padding: spacing.xl, marginTop: spacing.xl },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.espresso, marginTop: spacing.md },
  emptyMsg: { fontSize: 14, color: colors.textMuted, marginTop: spacing.xs, textAlign: 'center' },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.caramel,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
    shadowOpacity: 0.25,
    elevation: 6,
  },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cream },
});
