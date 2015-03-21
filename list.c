#include "list.h"
#include <stdlib.h>
struct NODE;
typedef struct NODE {
	int number;
	struct NODE* next; //pointing to the next node

} NODE;

NODE* startofList = NULL;

void add(int number){
	NODE* newNODE = (NODE*)malloc(sizeof(NODE)); //making a new node
	newNODE -> number = number; //deferencing newNODE and using dot operator
	newNODE -> next = NULL; //end of the list
	//startofList is NULL
	if (startofList == NULL){
		startofList = newNODE; //pointing startofList to newNODE
	}
	//startofList is not NULL
	else if(startofList != NULL){
		NODE* iterator = startofList; //creating a iterator for NODE
		while(iterator -> next != NULL){ //traversing the list until the end
			iterator = iterator -> next;
		}
		iterator -> next = newNODE; //pointing the next NODE of the last NODE in the list to the newNODE
	}
}

void prettyPrint(){
	NODE* iterator = startofList;
	//startofList is NULL
	if(startofList == NULL){
		printf("The list is empty.");
	}
	//startofList is not NULL
	if(startofList != NULL){
		printf("[");
		while(iterator != NULL){
			printf("%d ", iterator -> number); //printing the number of the node
			iterator = iterator -> next; //update the value of iterator
		}
		printf("]\n");
	}
}