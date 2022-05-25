KEY_CHAIN=build.keychain
CERTIFICATE_P12=certificate.p12

echo "Adding identity to chain"

# Recreate the certificate from the secure environment variable
echo $CERTIFICATE_OSX_P12 | base64 --decode > $CERTIFICATE_P12

#create a keychain
security create-keychain -p github $KEY_CHAIN

echo "Key chain created"

# Make the keychain the default so identities are found
security default-keychain -s $KEY_CHAIN

# Unlock the keychain
security unlock-keychain -p github $KEY_CHAIN

security import $CERTIFICATE_P12 -k $KEY_CHAIN -P $CERTIFICATE_PASSWORD -T /usr/bin/codesign;

security find-identity -v

security set-key-partition-list -S apple-tool:,apple: -s -k github $KEY_CHAIN

# remove certs
rm -fr *.p12
