#import <Stripe/Stripe.h>
#import "stripe.h"

@implementation ReactStripe

// Expose the module to the React Native bridge

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getCardToken:(NSString *)cardNumber
                  expirationMonth:(NSUInteger)expMonth
                  expirationYear:(NSUInteger)expYear
                  cvcNumber:(NSString *)cvc
                  errorCallback:(RCTResponseSenderBlock)failureCallback
                  callback:(RCTResponseSenderBlock)successCallback) {
  
  STPCard *card = [[STPCard alloc] init];
  card.number = cardNumber;
  card.expMonth = expMonth;
  card.expYear = expYear;
  card.cvc = cvc;
  [[STPAPIClient sharedClient] createTokenWithCard:card
     completion:^(STPToken *token, NSError *error) {
        NSMutableArray *tokenArray = [[NSMutableArray alloc] init];
        if (error) {
        NSString *errorDescription = [NSString stringWithFormat:@"%@", error.localizedDescription];
        [tokenArray addObject:errorDescription];
        failureCallback(tokenArray);
        } else {
        NSString *tokenId = [NSString stringWithFormat:@"%@", token.tokenId];
        [tokenArray addObject:tokenId];
        successCallback(tokenArray);
        }
        }];
}

RCT_EXPORT_METHOD(getBankAccountToken:(NSString *)accountNumber
                  routingNumber:(NSString *)routingNumber
                  country:(NSString *)country
                  currency:(NSString *)currency
                  errorCallback:(RCTResponseSenderBlock)failureCallback
                  callback:(RCTResponseSenderBlock)successCallback) {
  
  STPBankAccount *bankAccount = [[STPBankAccount alloc] init];
  bankAccount.accountNumber = accountNumber;
  bankAccount.routingNumber = routingNumber;
  bankAccount.country = country;
  bankAccount.currency = currency;
  [[STPAPIClient sharedClient] createTokenWithBankAccount:bankAccount
                                        completion:^(STPToken *token, NSError *error) {
                                          NSMutableArray *tokenArray = [[NSMutableArray alloc] init];
                                          if (error) {
                                            NSString *errorDescription = [NSString stringWithFormat:@"%@", error.localizedDescription];
                                            [tokenArray addObject:errorDescription];
                                            failureCallback(tokenArray);
                                          } else {
                                            NSString *tokenId = [NSString stringWithFormat:@"%@", token.tokenId];
                                            [tokenArray addObject:tokenId];
                                            successCallback(tokenArray);
                                          }
                                        }];
}

@end